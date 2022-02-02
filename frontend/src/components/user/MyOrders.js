import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../utils/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { notifyUser } from '../../redux/actions/notifyActions';
import Alert from '../utils/Alert';
import { getMyOrders, clearErrors } from '../../redux/actions/orderActions';
import Menu from '../layouts/menu/Menu';

export default function MyOrders() {

    const dispatch= useDispatch();

    const { loading, orders, error }= useSelector(state => state.orders);
    const { message, messageType }= useSelector(state => state.notify);

    useEffect(() => {
        dispatch(getMyOrders());

        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        }
        
    }, [error, dispatch]);


    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                   sort: 'desc'
                },
                {
                    label: 'Nbr des produits',
                    field: 'numOfItems'
                },
                {
                    label: 'Montant',
                    field: 'amount'
                },
                {
                    label: 'Statut',
                    field: 'status'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows : []
        };

        orders && orders.forEach(order => {
            data.rows.push({
                id : order._id,
                numOfItems : order.orderItems && order.orderItems.reduce((acc, item) => {
                    return acc + item.quantity
               },0),
                amount: `${order.totalPrice} TND`,
                status : order.orderStatus && String(order.orderStatus).includes('livrée')
                ? <p style={{color : 'green'}}>{order.orderStatus}</p>
                : <p style={{color : 'red'}}>{order.orderStatus}</p>,
                actions : 
                <Fragment>
                    <Link to={`/user/orders/${order._id}`} className="btn py-1 px-2 me-3 fs-4 bg-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
                </Fragment>
            })
            
        });
        return data
    };

    return (
        <div>
            <Menu />

            {loading ? <Loader/> : (
                    <div className='container'>
                        <Fragment>
                            {error && <Alert message={message} messageType={messageType} /> }
                            <h1 className="text-uppercase my-5" >Commandes</h1>
                            {loading ? <Loader /> : (
                                <MDBDataTable 
                                data={setOrders()}
                                className="mx-3 fs-4"
                                bordered
                                hover
                                striped
                            />
                            )}
                        </Fragment>
                    </div>
            )}
               
        </div>
    )
}
