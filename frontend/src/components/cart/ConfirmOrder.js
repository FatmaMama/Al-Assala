import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../layouts/menu/Menu';
import CheckoutSteps from './CheckoutSteps';
import { notifyUser } from '../../redux/actions/notifyActions';
import { clearErrors, newOrder } from '../../redux/actions/orderActions';
import Alert from '../utils/Alert';

export default function ConfirmOrder() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, shippingInfo, cartPrice } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const { loading, error } = useSelector(state => state.newOrder);
    const { message, messageType } = useSelector(state => state.notify);

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    };

    const order = {
        orderItems : cartItems,
        shippingInfo,
        itemsPrice : cartPrice.subTotalPrice,
        shippingPrice : cartPrice.newShippingPrice,
        saleCoupon : cartPrice.newSubtotalPrice ? cartPrice.saleCoupon : 0 ,
        totalPrice : cartPrice.totalPrice
    };

    useEffect(() => {
        if(error) {
            dispatch(notifyUser(error, 'error'))
            dispatch(clearErrors());
        }
    },[dispatch, error]);


    const placeOrderHandler = (order) => {
        dispatch(newOrder(order));
        navigate('/success/order')

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };
    }

    return (
        <div>
            <Menu />
            <CheckoutSteps payment />
            {error && <Alert  message={message} messageType={messageType} /> }

            <div className='row info'>
                <div className='col-12 col-lg-5 info__box'>
                    <h3 className='text-uppercase'>{user && user.firstName + ' ' + user.lastName}</h3>
                    <div className='info__items mt-2'>
                        <span className='info__item-1'>Contact:</span>
                        <span className='info__item-2'>{shippingInfo && '+216 ' + shippingInfo.phoneNo}</span>
                        <span className='info__item-3'>Modifier</span>
                    </div>
                    <div className='info__items mt-2'>
                        <span className='info__item-1'>Expédier à:</span>
                        <span className='info__item-2'>{`${shippingInfo && shippingInfo.address}, ${shippingInfo && shippingInfo.city},
                                ${shippingInfo && shippingInfo.postalCode}, ${shippingInfo && shippingInfo.country}`}</span>
                        <Link to='/shipping' className='info__item-3'>Modifier</Link>
                    </div>
                </div>

                <div className='col-12 col-lg-5 mt-5 mt-lg-0 info__box'>
                    <div className='info__items'>
                        <span className='info__item-1'>Mode d'expédition:</span>
                        <span className='info__item-2'>Livraison 2-3 jours</span>
                        <span>{Number(cartPrice.newShippingPrice) === 0 ? 'Gratuite' : cartPrice.newShippingPrice + ' TND'}</span>
                    </div>
                    <hr/>
                    <div className='info__items'>
                        <span className='info__item-1'>Moyen de paiement:</span>
                        <span className='info__item-2'>Paiement à la livraison <p>Payer en argent comptant à la livraison</p></span>
                        <span>{cartPrice.totalPrice + ' TND'}</span>
                    </div>
                </div>
            </div>

            <div className='p-5 mt-5'>
                <h2 className='cart-title cart__order-title'>Votre commande: <b>{getCartCount()} Articles</b></h2>
        
                        <div className='pt-5'>
                            <div className='cart__container cart__order'>
                                <div className='cart__grid cart__head'>
                                    <h4>&nbsp;</h4>
                                    <h4 className='center'>Produit</h4>
                                    <h4 className='center'>Couleur</h4>
                                    <h4 className='center'>Taille</h4>
                                    <h4 className='center'>Prix</h4>
                                    <h4 className='center'>Quantité</h4>
                                </div>

                                {cartItems.map(item => (
                                    <Fragment key={item.product}>
                                    <hr />
                                    <div key={item.product} className='cart__grid'>
                                        <div className='cart__img-container'>
                                            <img src={item.image} alt={item.name} className='cart__img' />
                                        </div>
                                        <div className='center cart__name-container'>
                                            <Link to={`/products/${item.product}`} className='cart__name' >{item.name}</Link>
                                        </div>
                                        <div className='center cart__color-container'>
                                            <span className='cart__color'><span className='cart__label'>Couleur: </span>{item.color}</span>
                                        </div>
                                        <div className='center cart__size-container'>
                                            <span className='cart__size'><span className='cart__label'>Taille: </span><b>{item.size}</b></span>
                                        </div>

                                        <div className='center cart__price-container'>
                                            {item.salePrice === 0 ? <p className='cart__price'><span className='cart__label'>Prix: </span>{`${item.price} TND`}</p>
                                                    : (
                                                        <Fragment>
                                                            <span className='cart__label'>Prix: </span>
                                                            <div className='d-flex gap-5 align-items-center justify-content-md-center'>
                                                                <span className='cart__price'>{`${item.salePrice && item.salePrice.toFixed(2)} TND`}</span>
                                                                <span className='product-cart__prev-price'>{`${item.price} TND`}</span>
                                                            </div>
                                                        </Fragment>
                                                    )}
                                        </div>

                                        <div className='center cart__qty-container-1'>
                                            <div className="cart__qty-container">
                                                <span className='cart__label'>Quantité: </span>
                                                <input type="number" className="form-control cart__qty" value={item.quantity} readOnly />
                                            </div>
                                        </div>

                                    </div>
                                     </Fragment>
                                ))}
                                <hr/>
                                
                            </div>

                            <div className='cart__summary cart__order-summary'>
                                <h2 className='text-center'>Total Panier</h2>
                                <hr />
                                <h4 className='cart__summary-item'>Sous-total:  <span className='cart__summary-value'>{cartPrice.subTotalPrice.toFixed(2) + ' TND'}</span></h4>

                                <div>
                                    {cartPrice.newSubtotalPrice !== 0 &&
                                    <div>
                                        <hr/>
                                        <h4 className='cart__summary-item'>Réduction:  
                                            <span className='cart__summary-saleValue'>{`- ${cartPrice.saleCoupon * 100}%`}</span>
                                        </h4>
                                        <h4 className='cart__summary-item'>Nouveau sous-total:  
                                            <span className='cart__summary-afterSaleValue'>{cartPrice.newSubtotalPrice + ' TND'}</span>
                                        </h4>
                                        <hr/>
                                    </div>
                                    
                                    }
                                </div>
                                
                                <h4 className='cart__summary-item'>Livraison:  <span className='cart__summary-value'>{cartPrice.newShippingPrice + ' TND'}</span></h4>
                                <hr/>
                                <h4 className='cart__summary-item'>Total: <span className='cart__summary-totalValue'>{cartPrice.totalPrice + ' TND'}</span></h4>
                                <hr />
                                <button  
                                    className="btn btn--1" 
                                    onClick={() => placeOrderHandler(order)}
                                    disabled={loading ? true : false}
                                    >
                                        Confirmer la commande
                                </button>
                            </div>
                        </div>
                    
             </div>
        </div>
    )
}
