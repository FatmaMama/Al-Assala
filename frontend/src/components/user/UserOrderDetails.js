import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { notifyUser } from '../../redux/actions/notifyActions';
import { getOrder, clearErrors } from '../../redux/actions/orderActions';
import Alert from '../layouts/Alert';
import Loader from '../layouts/Loader';
import Menu from '../layouts/Menu';

export default function UserOrderDetails() {

    const dispatch = useDispatch();
    const params = useParams();

    const {loading, order, error} = useSelector(state => state.orderDetails);
    const {shippingInfo, orderItems, user, totalPrice, itemsPrice, shippingPrice, orderStatus, isPaid, saleCoupon} = order;
    const { message, messageType }= useSelector(state => state.notify);

    const getCartCount = () => {
        return order && orderItems && orderItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    };

    useEffect(() => {
        if(order && order._id !== params.id){
            dispatch(getOrder(params.id));
        } 
        
        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
        
    }, [order, params, error, dispatch]);

    return (
        <div>
            <Menu />
            {loading ? <Loader/> : (
                <Fragment>
                    {error && <Alert message={message} messageType={messageType} /> }

                    <div className="my-4 mx-5 p-5">
                        <span className="me-4 order__title">Commande #{order && order._id && order._id.slice(19, 24)}</span>
                        <span><b>( {order && order.createdAt && order.createdAt.slice(0,10)} )</b></span>
                    </div>

                    <div className='row info'>
                        <div className='col-12 col-lg-5 info__box'>
                            
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Nom et Prénom:</span>
                                <span className='info__item-2 text-uppercase'>{user && user.firstName + ' ' + user.lastName}</span>
                            </div>
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Contact:</span>
                                <span className='info__item-2'>{shippingInfo && '+216 ' + shippingInfo.phoneNo}</span>
                            </div>
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Expédier à:</span>
                                <span className='info__item-2'>{`${shippingInfo && shippingInfo.address}, ${shippingInfo && shippingInfo.city},
                                        ${shippingInfo && shippingInfo.postalCode}, ${shippingInfo && shippingInfo.country}`}</span>
                            </div>
                        </div>

                        <div className='col-12 col-lg-6 mt-5 mt-lg-0 info__box'>
                            <div className='info__items'>
                                <span className='info__item-1'>Paiment:</span>
                                <span className='info__item-2 text-uppercase'>{order && isPaid ? "payé" : "non payé"}</span>
                            </div>
                                
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Statut de la commande:</span>
                                <span className='info__item-2 text-uppercase'>{order && orderStatus}</span> 
                            </div>
                                
                            <div className='info__items mt-2'>
                                <span className='info__item-1'>Montant:</span>
                                <span className='info__item-2'><b>{order && totalPrice + ' TND'}</b></span>
                            </div>
                            {/* <div className='info__items'>
                                <span className='info__item-1'>Mode d'expédition:</span>
                                <span className='info__item-2'>Livraison 2-3 jours</span>
                                <span>{order && order.shippingPrice === 0 ? 'Gratuite' : order.shippingPrice + ' TND'}</span>
                            </div>
                            <hr/>

                            <div className='info__items'>
                                <span className='info__item-1'>Moyen de paiement:</span>
                                <span className='info__item-2'>Paiement à la livraison <p>Payer en argent comptant à la livraison</p></span>
                                <span>{order.totalPrice + ' TND'}</span>
                            </div> */}
                        </div>
                    </div>

                    <div className='p-5 mt-5'>
                        <h2 className='cart-title cart__order-title'>Votre commande: <b>{getCartCount()} Articles</b></h2>
        
                        <div className='mt-5'>
                            <div className='cart__container cart__order'>
                                <div className='cart__grid cart__head'>
                                    <h4></h4>
                                    <h4 className='center'>Produit</h4>
                                    <h4 className='center'>Couleur</h4>
                                    <h4 className='center'>Taille</h4>
                                    <h4 className='center'>Prix</h4>
                                    <h4 className='center'>Quantité</h4>
                                </div>

                                {order && orderItems && orderItems.map(item => (
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
                                <h4 className='cart__summary-item'>Sous-total:  <span className='cart__summary-value'>{order && itemsPrice && itemsPrice.toFixed(2) + ' TND'}</span></h4>

                                <div>
                                    {saleCoupon !== 0 &&
                                    <div>
                                        <hr/>
                                        <h4 className='cart__summary-item'>Réduction:  
                                            <span className='cart__summary-saleValue'>{`- ${saleCoupon * 100}%`}</span>
                                        </h4>
                                        <h4 className='cart__summary-item'>Nouveau sous-total:  
                                            <span className='cart__summary-afterSaleValue'>{(itemsPrice * (1-saleCoupon)).toFixed(2) + ' TND'}</span>
                                        </h4>
                                        <hr/>
                                    </div>
                                    
                                    }
                                </div>
                                
                                <h4 className='cart__summary-item'>Livraison:  <span className='cart__summary-value'>{Number(shippingPrice).toFixed(2) + ' TND'}</span></h4>
                                <hr/>
                                <h4 className='cart__summary-item'>Total: <span className='cart__summary-totalValue'>{totalPrice + ' TND'}</span></h4>
                            </div>
                        </div>
             </div>
                </Fragment>
            )}
        </div>
    )
}
