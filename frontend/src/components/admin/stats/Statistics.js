import React, { useEffect } from 'react';
import Sidebar from '../../layouts/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getMonthlyOrders, getOrders, getTodayOrders, getWeeklyOrders } from '../../../redux/actions/orderActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Alert from '../../layouts/Alert';
import Loader from '../../layouts/Loader';

export default function Statistics() {

    const dispatch = useDispatch();

    const { loading: ordersLoading, totalAmount, ordersCount, error } = useSelector(state => state.orders);
    const { loading, error: todayError,todayYesterdayOrders} = useSelector(state => state.todayYesterdayOrders);
    const { loading: weeklyLoading, error: weeklyError,weeklyOrders} = useSelector(state => state.weeklyOrders);
    const { loading: monthlyLoading, error: monthlyError,monthlyOrders} = useSelector(state => state.monthlyOrders);
    const { message, messageType } = useSelector(state => state.notify);

      
    const todaydate = new Date();  
    const oneJan =  new Date(todaydate.getFullYear(), 0, 1);   
    const numberOfDays =  Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));   
    const currentWeek = Math.ceil(( todaydate.getDay() + 1 + numberOfDays) / 7);   

    const today = todayYesterdayOrders && todayYesterdayOrders.find(order => order.day === new Date().getDate());
    const yesterday = todayYesterdayOrders && todayYesterdayOrders.find(order => order.day === new Date().getDate() - 1);
    const thisWeek = weeklyOrders && weeklyOrders.find(order => order.week === currentWeek);
    const thisMonth = monthlyOrders && monthlyOrders.find(order => order.month === new Date().getMonth() + 1);

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getMonthlyOrders());
        dispatch(getWeeklyOrders());
        dispatch(getTodayOrders());

        if(error){
            dispatch(notifyUser(error, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(todayError){
            dispatch(notifyUser(todayError, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(weeklyError){
            dispatch(notifyUser(weeklyError, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

        if(monthlyError){
            dispatch(notifyUser(monthlyError, 'error'))
            setTimeout(() => dispatch(clearErrors()), 5000)
        };

    }, [dispatch, error, todayError, weeklyError, monthlyError])

    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            {(loading || ordersLoading || weeklyLoading || monthlyLoading) ? <Loader/> : (
                <div className="col-12 col-md-10 px-5 statistics">
                <h1 className="text-uppercase my-5" >Statistiques des revenues</h1>
                {(error || todayError || weeklyError || monthlyError) && <Alert  message={message} messageType={messageType}/>}
               
                <div className='row'>
                    <div className="col-lg-6 col-12 mb-3 mt-3">
                        <div className="card text-white o-hidden today">
                            <div className="card-body">
                                <div className='fs-3 text-uppercase'>Aujourd'hui</div>
                                <div className="text-center">
                                <i className="fas fa-coins me-3"></i>
                                     {`${today ? today.earnings.toFixed(2) : 0} TND`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/non-traitée">
                                <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>{today ? today.numOfOrders : 0} </span>
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
                                    {`${yesterday ? yesterday.earnings.toFixed(2) : 0} TND`}
                                </div>
                            </div>
                            
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/expédiée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>{yesterday ? yesterday.numOfOrders : 0}</span>
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
                                {`${thisWeek ? thisWeek.earnings.toFixed(2) : 0} TND`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/livrée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>{thisWeek ? thisWeek.numOfOrders : 0}</span>
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
                                {`${thisMonth ? thisMonth.earnings.toFixed(2) : 0} TND`}
                                </div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/retournée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>{thisMonth ? thisMonth.numOfOrders : 0}</span>
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
                                     {totalAmount ? totalAmount.toFixed(2) : 0} TND
                                </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders/status/retournée">
                            <div className="float-end">
                                    <i className="fas fa-box-open me-3"></i>
                                    <span className='me-4'>{ordersCount ? ordersCount : 0} </span>
                                </div>
                            </Link>
                                    </div>
                                </div>
                            </div>
            </div>
            )}
            
        </div>
    )
}
