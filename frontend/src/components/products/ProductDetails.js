import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { notifyUser } from '../../redux/actions/notifyActions';
import { getProductByColor, clearErrors, getProduct } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';
import Menu from '../layouts/Menu';
import classNames from 'classnames';

export default function ProductDetails() {

    const dispatch = useDispatch();
    const params = useParams();

    const [mainImage, setMainImage] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newSize, setNewSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { loading, product, error } = useSelector(state => state.productDetails);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        // if(product && product._id !== params.id && newColor === ''){
        //     dispatch(getProduct(params.id))
        // } else {
        //     setMainImage(product.images[0].url);
        //     setNewColor(product.color)
        // }

        if(product && product._id !== params.id && newColor === ''){
            dispatch(getProduct(params.id));
            
        } else if (product && newColor !== '') {
            dispatch(getProductByColor(newColor, product.name))
        }

        if(product && product.images){
            setMainImage(product.images[0].url);
        }
        

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, params, JSON.stringify(product), newColor]);

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
                        <div className="row d-flex justify-content-around">
                            <div className=' col-9 col-sm-9'>
                                <img src={mainImage} alt="photo du produit" className='product__main-img'/>
                            </div>
                            <div className='col-2 col-sm-2'>
                                {product && product.images && product.images.map(image => (
                                <div className='product__img-container-2'>
                                    <img className='product__img' key={image.public_id} src={image.url} alt="photo du produit" onClick={() => setMainImage(image.url)}/>
                                </div>
                                ))} 
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-lg-5'>
                        <h3 className='product__title'>{product && product.name}</h3>
                        <p className='product__id'>Produit #{product && product._id}</p>

                        <hr/>
                        <h4 className="mt-2 product__description">Description:</h4>
                        <p>{product && product.description}</p>
                        <hr/>

                        <p className='product__price'>{`${product && product.price} TND`}</p>

                        <div className='row'>
                            <div className='col-6 col-md-6'>
                                <p>Couleur <span className='text-uppercase'>{product && product.color}</span></p>
                                <div className='product__color-container'>
                                    {product && product.colors && product.colors.map(color => (
                                        <div 
                                            key={color._id} 
                                            className='product__color' 
                                            style={{backgroundColor: color.code}}
                                            onClick={() => {setNewColor(color.colorName)
                                                dispatch(getProductByColor(newColor, product.name))}}
                                        ></div>
                                    ))}
                                </div>
                                <h1>{console.log(newColor)}</h1>
                            </div>
                            <div className='col-6 col-md-6'>
                                <p>Tailles</p>
                                <div className='product__size-container'>
                                    {product && product.sizes && product.sizes.map(size => (
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
                        <p>{product && product.sizeGuide}</p>


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
