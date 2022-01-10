import React, {Fragment} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from '../layouts/Menu';

export default function Cart() {

    const {cartItems} = useSelector(state => state.cart);
    // const {settings} = useSelector(state => state.settingsInfos)

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    };

   

    return (
        <div>
             <Menu />
             <div className='p-5'>
                {cartItems.length === 0 ? <h2>Votre panier est vide...</h2> : (
                    <Fragment>
                        <h1>Votre panier: <b>{getCartCount()} Articles</b></h1>
        
                        <div className="cart">
                             <div className='cart__container'>
                                 {cartItems.map(item => (
                                     <Fragment key={item.product}>
                                        <hr />
                                        <div >
                                            <div className="row cart__item">
                                                <div className="col-2 col-md-1">
                                                    <img src={item.image} alt={item.name} className='cart__img'/>
                                                </div>

                                                <div className="col-5 col-md-3 d-flex justify-content-center align-items-center">
                                                    <Link to={`/products/${item.product}`} className='cart__name' >{item.name}</Link>
                                                </div>

                                                <div className="col-3 col-md-2 d-flex justify-content-center align-items-center">
                                                    <p className='cart__color'>{item.color}</p>
                                                </div>

                                                <div className="col-2 col-md-1 mt-md-0 d-flex justify-content-center align-items-center">
                                                    <p className='cart__size'><b>{item.size}</b></p>
                                                </div>

                                                <div className="col-6 col-md-3 mt-4 mt-md-0 d-flex justify-content-center align-items-center">
                                                    {item.salePrice === 0 ? <p className='cart__price'>{`${item.price} TND`}</p>
                                                    : (
                                                        <div className='d-flex align-items-center gap-5'>
                                                            <span className='cart__price'>{`${item.salePrice && item.salePrice.toFixed(2)} TND`}</span>
                                                            <span className='product-cart__prev-price'>{`${item.price} TND`}</span>
                                                        </div>
                                                    )}
                                                    
                                                </div>

                                                <div className="col-3 col-md-2 mt-4 mt-md-0">
                                                    <div className="cart__qty-container">
                                                        <button className='cart__btn' ><i className="fas fa-minus"></i></button>
                                                        <input type="number" className="form-control cart__qty" value={item.quantity} readOnly />
                                                        <button className='cart__btn' ><i className="fas fa-plus"></i></button>
                                                    </div>
                                                </div>

                                                <div className="cart__delete">
                                                    <i className="fa fa-trash"></i>
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                     </Fragment>
                                 ))}
                                
                            </div>

                            <div className='cart__summary'>
                                <h2 className='text-center'>Total Panier</h2>
                                <hr />
                                <h4 className='cart__summary-item'>Sous-total:  <span className="order-summary-values"></span></h4>
                                <h4 className='cart__summary-item'>Livraison:  <span className="order-summary-values">3 (Units)</span></h4>
                                <hr/>
                                <h4 className='cart__summary-item'>Total: <span className="order-summary-values">$765.56</span></h4>
                    
                                <hr />
                                <button  className="cart__btn">Commander</button>
                            </div>
                        </div>
                    </Fragment>
                 )}
                
             </div>
        </div>
    )
}
