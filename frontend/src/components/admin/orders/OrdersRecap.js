import React, { useEffect, useState } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getByStatusOrders } from '../../../redux/actions/orderActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import OrdersByStatusModal from './OrdersByStatus';

export default function OrdersRecap() {

    const dispatch = useDispatch();

    // const [nonTreatedOrders, setNonTreatedOrders] = useState({});

    const { orders, error } = useSelector(state => state.orders);
    const { message, messageType } = useSelector(state => state.notify)

    const nonTreatedOrders = orders && orders.find(order => order.orderStatus === "non-traitée");
    const shippedOrders = orders && orders.find(order => order.orderStatus === "expédiée");
    const deliveredOrders = orders && orders.find(order => order.orderStatus === "livrée");
    const returnedOrders = orders && orders.find(order => order.orderStatus === "retournée");

    useEffect(() => {
        dispatch(getByStatusOrders());
        // console.log(orders);
        // if(orders){
        //     setNonTreatedOrders(() => orders.find(order => order.orderStatus === "non traitée"))
        // }
        // console.log(nonTreatedOrders)
        
        if(error) {
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, error])

    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10 px-5 dashboard">
                <h1 className="text-uppercase my-5" >Récapitulation des commandes</h1>
                {error && <Alert  message={message} messageType={messageType}/>}
               
                <div className='row'>
                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <i className="fas fa-question-circle me-3"></i>
                                    Commandes Non Traitées {`(${nonTreatedOrders ? nonTreatedOrders.numOfOrders : 0})`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/non-traitée">
                                <span className="float-start">Voir Les Details</span>
                                <span className="float-end">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <i className="fas fa-shipping-fast me-3"></i>
                                    Commandes Expédiées {`(${shippedOrders ? shippedOrders.numOfOrders : 0})`}
                                </div>
                            </div>
                            
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/expédiée">
                                <span className="float-start">Voir Les Details</span>
                                <span className="float-end">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                               
                           
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <i className="fas fa-money-bill-alt me-3"></i>
                                    Commandes Livrées {`(${deliveredOrders ? deliveredOrders.numOfOrders : 0})`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/livrée">
                                <span className="float-start">Voir Les Details</span>
                                <span className="float-end">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white bg-warning o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <i className="fas fa-angry me-3"></i>
                                    Commandes Retournées {`(${returnedOrders ? returnedOrders.numOfOrders : 0})`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/retournée">
                                <span className="float-start">Voir Les Details</span>
                                <span className="float-end">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
