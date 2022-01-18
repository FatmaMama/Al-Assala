import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../../redux/actions/cartActions';
import Menu from '../layouts/Menu'

export default function OrderSuccess() {

    const dispatch = useDispatch();

    const { cartItems, shippingInfo, cartPrice } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(resetCart())
    }, [dispatch]);
    
    return (
        <div>
            <Menu />
            <div>
                <i className="far fa-check-circle"></i>
                <span>Merci {user.firstName}!</span>
                <p>Vous pouvez suivre vos commandes à travers votre profil</p>
            </div>

            
        </div>
    )
}
