import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { notifyUser } from '../../redux/actions/notifyActions';
import { getProductByColor, clearErrors, getProduct } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';
import Menu from '../layouts/Menu'

export default function ProductDetails() {

    const dispatch = useDispatch();
    const params = useParams();

    const [mainImage, setMainImage] = useState('');

    const { loading, product, error } = useSelector(state => state.productDetails);
    const { message, messageType } = useSelector(state => state.notify);

    useEffect(() => {
        if(product && product._id !== params.id){
            dispatch(getProduct(params.id))
        } else {
            setMainImage(product.images[0].url)
        }

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, params, JSON.stringify(product)])

    return (
        <div>
            <Menu />
            {loading ? <Loader/> : (
                
                <div className="row  product">
                    <div className='col-12 col-lg-5'>
                        <div className="row d-flex justify-content-around">
                            <div className='col-lg-9'>
                                <img src={mainImage} alt="photo du produit" className='product__main-img'/>
                            </div>
                            <div className='col-lg-2'>
                                {product && product.images && product.images.map(image => (
                                <div className='product__img-container-2'>
                                    <img className='product__img' key={image.public_id} src={image.url} alt="photo du produit" onClick={() => setMainImage(image.url)}/>
                                </div>
                                ))} 
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-lg-5'>
                        <h3 className='product__title'>{product.name}</h3>
                        <p className='product__id'>Produit #{product._id}</p>

                        <hr/>
                        <h4 className="mt-2 product__description">Description:</h4>
                        <p>{product.description}</p>
                        <hr/>

                        <p className='product__price'>{`${product.price} TND`}</p>

                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <p>Couleurs</p>
                                <div className='product__color-container'>
                                    {product && product.colors && product.colors.map(color => (
                                        <div key={color} className='product__color' style={{backgroundColor: color.code}} ></div>
                                    ))}
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <p>Tailles</p>
                                <div className='product__size-container'>
                                    {product && product.sizes && product.sizes.map(size => (
                                        <div key={size} className='product__size' >{size.sizeName} </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr/>
                        <h4 className="mt-2 product__description">Guide des tailles:</h4>
                        <p>{product.sizeGuide}</p>


                        <div className="product__add-container">
                            <div className="product__qty-container">
                                <button className='product__btn' product__add><i className="fas fa-minus"></i></button>
                                <input type="number" className="form-control product__qty" value="1" readOnly />
                                <button className='product__btn'><i className="fas fa-plus"></i></button>
                            </div>
                            <button type="button" className="product__add-btn">Ajouter au panier</button>
                        </div>
                        

                    </div>
                </div>
            )}
        </div>
    )
}
