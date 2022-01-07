import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { notifyUser } from '../../redux/actions/notifyActions';
import { getProductByColor, clearErrors, getProduct } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';
import Menu from '../layouts/Menu';
import classNames from 'classnames';

export default function ProductDetails() {

    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation()
    const navigate = useNavigate();

    const [mainImage, setMainImage] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newSize, setNewSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [productToDisplay, setProductToDisplay] = useState({})
   

    const { loading, product, error } = useSelector(state => state.productDetails);
    const { loading: byColorLoading, productByColor, error: byColorError } = useSelector(state => state.productDetailsByColor);
    const { message, messageType } = useSelector(state => state.notify);

    const data = useMemo(()=>(productByColor), [productByColor._id]);

    useEffect(() => {
        if(product && product._id !== params.id){
            dispatch(getProduct(params.id))
        } else {
            setProductToDisplay(product)
            setMainImage(product.images[0].url);
        }

        if(newColor !== ''){
            dispatch(getProductByColor(newColor, product.name));
            setProductToDisplay(productByColor)
            if (data && data.images){
                setMainImage(data.images[0].url)
            }
        }

        // if(newColor === ''){
        //     dispatch(getProduct(params.id));
        //     if(product){
        //         setProductToDisplay(product);
        //     }
        // } else if (product && newColor !== '') {
        //     dispatch(getProductByColor(newColor, product.name));
        //     if(productByColor){
        //         console.log('productByColor', productByColor)
        //         setProductToDisplay(productByColor[0])
        //     }
        // }

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, params, JSON.stringify(product), data, newColor,  navigate]);

    const increaseQty = () => {
        const count = document.querySelector('.product__qty');
        let foundSize;
        if(product && product.sizes) {
            foundSize = product.sizes.find( size => newSize === size.sizeName)
        }

        if(count.valueAsNumber >= foundSize.stock) return ;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    };

    const decreaseQty = () => {
        const count = document.querySelector('.product__qty');

        if(count.valueAsNumber <= 1) return ;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    };

    return (
        <div>
            <Menu />
            {loading ? <Loader/> : (
                
                <div className="row  product">
                    <div className='col-12 col-lg-5'>
                        
                        <h1>{console.log('productByColor', productByColor)}</h1>
                        <h1>{console.log('data', data)}</h1>
                        <h1>{console.log("product to display: ", productToDisplay)} </h1>
                        
                        <div className="row d-flex justify-content-around">
                            <div className=' col-9 col-sm-9'>
                                <img src={mainImage} alt="photo du produit" className='product__main-img'/>
                            </div>
                            <div className='col-2 col-sm-2'>
                                {productToDisplay && productToDisplay.images && productToDisplay.images.map(image => (
                                <div key={image.public_id}>
                                    <img className='product__img' key={image.public_id} src={image.url} alt="photo du produit" onClick={() => setMainImage(image.url)}/>
                                </div>
                                ))} 
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-lg-5'>
                        <h3 className='product__title'>{productToDisplay && productToDisplay.name}</h3>
                        <p className='product__id'>Produit #{productToDisplay && productToDisplay._id}</p>

                        <hr/>
                        <h4 className="mt-2 product__description">Description:</h4>
                        <p>{productToDisplay && productToDisplay.description}</p>
                        <hr/>

                        <p className='product__price'>{`${productToDisplay && productToDisplay.price} TND`}</p>

                        <div className='row'>
                            <div className='col-6 col-md-6'>
                                <p>Couleur <span className='text-uppercase'>{productToDisplay && productToDisplay.color}</span></p>
                                <div className='product__color-container'>
                                    {productToDisplay && productToDisplay.colors && productToDisplay.colors.map(color => (
                                        <div 
                                            key={color._id} 
                                            className='product__color' 
                                            style={{backgroundColor: color.code}}
                                            onClick={() => {setNewColor(color.colorName)
                                                
                                            }}
                                        ></div>
                                    ))}
                                </div>
                                <h1>{console.log(newColor)}</h1>
                            </div>
                            <div className='col-6 col-md-6'>
                                <p>Tailles</p>
                                <div className='product__size-container'>
                                    {productToDisplay && productToDisplay.sizes && productToDisplay.sizes.map(size => (
                                        <div key={size._id} 
                                            onClick={() => size.stock > 0 ? setNewSize(size.sizeName) : setNewSize('')}
                                            className={classNames('product__size', {
                                            'product__outOfStock' : size.stock <= 0,
                                            'product__inStock' : size.stock > 0,
                                            'product__activeSize' : size.sizeName === newSize && size.stock > 0
                                        })} >{size.sizeName} </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr/>
                        <h4 className="mt-2 product__description">Guide des tailles:</h4>
                        <p>{productToDisplay && productToDisplay.sizeGuide}</p>


                        <div className="product__add-container">
                            <div className="product__qty-container">
                                <button className='product__btn' onClick={decreaseQty}><i className="fas fa-minus"></i></button>
                                <input type="number" className="form-control product__qty" value={quantity} readOnly />
                                <button className='product__btn' onClick={increaseQty}><i className="fas fa-plus"></i></button>
                            </div>
                            <button type="button" className="product__add-btn">Ajouter au panier</button>
                        </div>
                        

                    </div>
                </div>
            )}
        </div>
    )
}
