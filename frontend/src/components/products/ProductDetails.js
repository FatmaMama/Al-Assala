import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { notifyUser } from '../../redux/actions/notifyActions';
import { getProductByColor, clearErrors, getProduct } from '../../redux/actions/productActions';
import Loader from '../utils/Loader';
import Menu from '../layouts/menu/Menu';
import Alert from '../utils/Alert';
import classNames from 'classnames';
import { addToCart } from '../../redux/actions/cartActions';
// import ReactImageMagnify from 'react-image-magnify';
// import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'

export default function ProductDetails() {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [mainImage, setMainImage] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newSize, setNewSize] = useState('');
    const [newSizeStock, setNewSizeStock] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [productToDisplay, setProductToDisplay] = useState({});
    const [successAdd, setSuccessAdd] = useState(false)

    const { loading, product, error } = useSelector(state => state.productDetails);
    const { productByColor } = useSelector(state => state.productDetailsByColor);
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

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, params, error, product, data, newColor,  navigate]);

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

    const setSizeAndStock = (size) => {
        if(size.stock > 0){
            setNewSize(size.sizeName); 
            setNewSizeStock(size.stock)
        } else {
            setNewSize('');
            setNewSizeStock(0)
        }
    };

    const addItemToCart = () => {
        dispatch(addToCart(productToDisplay._id, quantity, newSize, newSizeStock));
        setSuccessAdd(true)
        dispatch(notifyUser(`${productToDisplay.name} a été ajouté à votre panier`, 'success'))
        setTimeout(() => setSuccessAdd(false), 4000)
    }

    return (
        <div>
            <Menu />
            {loading ? <Loader/> : (
                
                <div className="row  product">
                    {(error || successAdd) && <Alert message={message} messageType={messageType} /> }
                    <div className='col-12 col-lg-5'>
                        <div className="row d-flex justify-content-around">
                            <div className=' col-9 col-sm-9'>
                                <img src={mainImage} alt={productToDisplay.name}  className='product__main-img'/>
                            </div>
                            <div className='col-2 col-sm-2'>
                                {productToDisplay && productToDisplay.images && productToDisplay.images.map(image => (
                                <div key={image.public_id}>
                                    <img className={classNames('product__img', {
                                            'product__activeImg' : image.url === mainImage
                                        })} 
                                        src={image.url} 
                                        alt={image.public_id}
                                        onContextMenu="return false;" 
                                        onClick={() => setMainImage(image.url)}/>
                                </div>
                                ))} 
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-lg-5 p-5 m-5 p-lg-0 m-lg-0'>
                        <h3 className='product__title'>{productToDisplay && productToDisplay.name}</h3>
                        <p className='product__id'>Produit #{productToDisplay && productToDisplay._id}</p>

                        <hr/>
                        <h4 className="mt-2 product__description">Description:</h4>
                        <p>{productToDisplay && productToDisplay.description}</p>
                        <hr/>

                        
                        <div>
                            {product.sale === 0 ?  <p className='product__price'>{`${productToDisplay && productToDisplay.price.toFixed(2)} TND`}</p>
                            : (
                                <div className='product__price-container'>
                                    <span className='product-cart__sale'>{`-${product.sale * 100}%`} </span>
                                    <span className='product__price'>{`${(product.price * (1 - product.sale)).toFixed(2)} TND`}</span>
                                    <span className='product-cart__prev-price'>{product.price.toFixed(2) + ' TND'} </span>
                                </div>
                            )}
                        </div>

                        <div className='row'>
                            <div className='col-6 col-md-6'>
                                <p>Couleur <span className='text-uppercase'>{productToDisplay && productToDisplay.color}</span></p>
                                <div className='product__color-container'>
                                    {productToDisplay && productToDisplay.colors && productToDisplay.colors.map(color => (
                                        <div 
                                            key={color._id} 
                                            className={classNames('product__color', {
                                                'product__activeColor' : color.colorName === newColor
                                            })}   
                                            style={{backgroundColor: color.code}}
                                            onClick={() => {setNewColor(color.colorName)
                                                
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className='col-6 col-md-6'>
                                <p>Tailles</p>
                                <div className='product__size-container'>
                                    {productToDisplay && productToDisplay.sizes && productToDisplay.sizes.map(size => (
                                        <div key={size._id} 
                                            onClick={() => setSizeAndStock(size)}
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
                        {productToDisplay && productToDisplay.sizeGuide && 
                            <div>
                                <h4 className="mt-2 product__description">Guide des tailles:</h4>
                                <p>{productToDisplay.sizeGuide}</p>
                            </div>
                        }
                        


                        <div className="product__add-container">
                            <div className="product__qty-container">
                                <button className='product__btn' onClick={decreaseQty}><i className="fas fa-minus"></i></button>
                                <input type="number" className="form-control product__qty" value={quantity} readOnly />
                                <button className='product__btn' onClick={increaseQty}><i className="fas fa-plus"></i></button>
                            </div>
                            <button type="button" 
                                    className="product__add-btn"
                                    onClick= {addItemToCart}
                                    disabled={newSizeStock === 0 ? true : false}
                            >
                                Ajouter au panier
                            </button>
                        </div>
                        {successAdd && <Alert message={message} messageType={messageType}/>}

                    </div>
                </div>
            )}
        </div>
    )
}
