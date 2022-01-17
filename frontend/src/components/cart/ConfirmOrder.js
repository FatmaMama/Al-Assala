import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from '../layouts/Menu'
import CheckoutSteps from './CheckoutSteps'

export default function ConfirmOrder() {

    const dispatch = useDispatch();

    const { cartItems, shippingInfo, cartPrice } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    return (
        <div>
            <Menu />
            <CheckoutSteps payment />

            <div className='row info'>
                <div className='col-12 col-md-5 info__box'>
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

                <div className='col-12 col-md-5 info__box'>
                    <div className='info__items'>
                        <span className='info__item-1'>Mode d'expédition:</span>
                        <span className='info__item-2'>Livraison 2-3 jours</span>
                        <span>{Number(cartPrice.newShippingPrice) === 0 ? 'Gratuite' : cartPrice.newShippingPrice + ' TND'}</span>
                    </div>
                    <hr/>
                    <div className='info__items'>
                        <span className='info__item-1'>Moyen de paiement:</span>
                        <span className='info__item-2'>Paiement à la livraison <p>Payer en argent comptant à la livraison</p></span>
                        <span>{cartPrice.newSubtotalPrice !== 0 ? (Number(cartPrice.newSubtotalPrice) + Number(cartPrice.newShippingPrice)).toFixed(2) + ' TND' : (cartPrice.subTotalPrice + Number(cartPrice.newShippingPrice)).toFixed(2) + ' TND'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
