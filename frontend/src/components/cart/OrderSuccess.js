import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../../redux/actions/cartActions';
import Menu from '../layouts/menu/Menu'

export default function OrderSuccess() {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(resetCart())
    }, [dispatch]);
    
    return (
        <div>
            <Menu />
            <div className='order-success'>
                <div className='order-success__container'>
                    <i className="far fa-check-circle order-success__icon"></i>
                    <span className='order-success__title'>Merci {user.firstName}!</span>
                </div>
                <p className='order-success__text'>Votre commande est maintenant confirmée.</p>
                <p className='order-success__text'>Vous pouvez suivre vos commandes à travers votre profil.</p>
            </div>


        </div>
    )
}
