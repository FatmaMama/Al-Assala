import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsDisplay({ products, productsCount, resPerPage }) {
    return (
        <Fragment>
            {productsCount > resPerPage ? <h3 className='text-center result-text'>{`Affichage de 1-${resPerPage} sur ${productsCount} résultats`}</h3>
                :  <h3 className='text-center result-text'>{`${productsCount} Résultats affichés`}</h3>
            }
            
            <div className='display'>
                {products && products.map(product => (
                    <div className='product-cart' key={product._id}>
                        <Link to={`/products/${product._id}`} className='product-cart__img-container'>
                            <img src={product.images[0].url} alt={product.name} className='product-cart__img' />
                            <div className='text-center product-cart__view' >Aperçu</div>
                        </Link>
                        
                        <div className='p-3'>
                            <h5 className='text-center product-cart__category'>{product.category.name}</h5>
                            <Link to={`/products/${product._id}`} className='text-center product-cart__title'>
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
                       
                        <button className='product-cart__button'>
                            <i className="fas fa-cart-plus me-2"></i>
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}
