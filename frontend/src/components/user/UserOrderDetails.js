import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { notifyUser } from '../../redux/actions/notifyActions';
import { getOrder, clearErrors } from '../../redux/actions/orderActions';

export default function UserOrderDetails() {

    const dispatch = useDispatch();
    const params = useParams();

    const {loading, order, error} = useSelector(state => state.orderDetails);
    const {shippingInfo, orderItems, user, totalPrice, itemsPrice, shippingPrice, orderStatus, isPaid, saleCoupon} = order;
    const { message, messageType }= useSelector(state => state.notify);

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
            
        </div>
    )
}
