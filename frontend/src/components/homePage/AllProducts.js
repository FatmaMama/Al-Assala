import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../layouts/Menu';
import { getProducts } from '../../redux/actions/productActions';
import Loader from '../layouts/Loader';

export default function AllProducts() {

    const dispatch = useDispatch();

    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category') ? new URLSearchParams(location.search).get('category') : '';
    const currentPage = new URLSearchParams(location.search).get('currentPage') ? new URLSearchParams(location.search).get('currentPage') : 1;

    const { loading, products, productsCount, resPerPage, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts(currentPage, category))
       
    }, [dispatch, currentPage, category])

    return (
        <div>
            <Menu />

            {loading ? <Loader/> : (
                <div className='display' >
                {products && products.map(product => (
                    <div className='product-cart' key={product._id}>
                        <Link to='#' >
                            <img src={product.images[0].url} alt={product.name} className='product-cart__img' />
                        </Link>
                        
                        <div className='p-3'>
                            <h5 className='text-center product-cart__category'>{product.category.name}</h5>
                            <Link to='#' className='text-center product-cart__title'>
                                <h2  >{product.name} </h2>
                                <h5>{`+${product.colors.length} couleurs`}</h5>
                            </Link>
                            <div>
                                {product.sale === 0 ?  <h3 className='text-center mt-5 product-cart__price'>{product.price + ' TND'} </h3>
                                : (
                                    <div className='mt-5 product-cart__price-container'>
                                        <span className='product-cart__sale'>{`-${product.sale * 100}%`} </span>
                                        <span className='product-cart__price'>{`${(product.price * (1 - product.sale)).toFixed(2)} TND`}</span>
                                        <span className='product-cart__prev-price'>{product.price + ' TND'} </span>
                                        <div className='product-cart__promo'>Promo</div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <Link to="#" >
                            <button className='product-cart__button'>
                                <i className="fas fa-cart-plus me-2"></i>
                                Ajouter au panier
                            </button>
                        </Link>
                       
                    </div>
                ))}
                </div>
            )}
            
        </div>
    )
}
