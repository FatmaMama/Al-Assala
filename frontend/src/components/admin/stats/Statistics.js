import React, { useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getByStatusOrders } from '../../../redux/actions/orderActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';

export default function Statistics() {

    const dispatch = useDispatch();

    const { orders, error } = useSelector(state => state.orders);
    const { message, messageType } = useSelector(state => state.notify)

    const nonTreatedOrders = orders && orders.find(order => order.orderStatus === "non-traitée");
    const shippedOrders = orders && orders.find(order => order.orderStatus === "expédiée");
    const deliveredOrders = orders && orders.find(order => order.orderStatus === "livrée");
    const returnedOrders = orders && orders.find(order => order.orderStatus === "retournée");

    useEffect(() => {
        dispatch(getByStatusOrders());
        
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

            <div className="col-12 col-md-10 px-5 statistics">
                <h1 className="text-uppercase my-5" >Statistiques des revenues</h1>
                {error && <Alert  message={message} messageType={messageType}/>}
               
                <div className='row'>
                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white o-hidden today">
                            <div className="card-body">
                                <div className='fs-3 text-uppercase'>Aujourd'hui</div>
                                <div className="text-center">
                                <i className="fas fa-coins me-3"></i>
                                     {`(${nonTreatedOrders ? nonTreatedOrders.numOfOrders : 0} TND)`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/non-traitée">
                                {/* <span className="float-start">Voir Les Details</span> */}
                                <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>20</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white yesterday o-hidden h-100">
                            <div className="card-body">
                                <div className='fs-3 text-uppercase'>Hier</div>
                                <div className="text-center">
                                <i className="fas fa-coins me-3"></i>
                                     {`(${nonTreatedOrders ? nonTreatedOrders.numOfOrders : 0} TND)`}
                                </div>
                            </div>
                            
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/expédiée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>20</span>
                                </div>
                            </Link>
                               
                           
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white week o-hidden h-100">
                            <div className="card-body">
                            <div className='fs-3 text-uppercase'>Cette semaine</div>
                                <div className="text-center">
                                <i className="fas fa-coins me-3"></i>
                                     {`(${nonTreatedOrders ? nonTreatedOrders.numOfOrders : 0} TND)`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/livrée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>20</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white month o-hidden h-100">
                            <div className="card-body">
                            <div className='fs-3 text-uppercase'>Ce mois</div>
                                <div className="text-center">
                                <i className="fas fa-coins me-3"></i>
                                     {`(${nonTreatedOrders ? nonTreatedOrders.numOfOrders : 0} TND)`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/retournée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>20</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                                <div className="col-xl-12 col-sm-12 ">
                                    <div className="card text-white allTime o-hidden h-100">
                                        <div className="card-body">
                                        
                                <div className="text-center">
                                <div className='statistics__title'>Montant Total</div>
                                <i className="fas fa-coins me-3"></i>
                                     {`(${nonTreatedOrders ? nonTreatedOrders.numOfOrders : 0} TND)`}
                                </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/retournée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>20</span>
                                </div>
                            </Link>
                                    </div>
                                </div>
                            </div>
            </div>
            
        </div>
    )
}
