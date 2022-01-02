import React, { useEffect } from 'react';
import Sidebar from '../layouts/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userActions';
import { getAdminProducts } from '../../redux/actions/productActions';
import { getOrders } from '../../redux/actions/orderActions';
import Loader from '../layouts/Loader';

export default function Dashboard() {

    const dispatch = useDispatch();
    const { loading, products, productsCount } = useSelector(state => state.products);
    const {loading: ordersLoading, totalAmount, ordersCount} = useSelector(state => state.orders);
    const { loading: usersLoading, usersCount } = useSelector(state => state.users);

    let outOfStock = 0
    products.forEach(product => {
        for(let i =0; i < product.sizes.length; i++) {
            if(product.sizes[i].stock === 0){
                        outOfStock += 1
                        return
                    }
        }
    })

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAdminProducts());
        dispatch(getOrders())
    }, [dispatch])

    return (
        
		<div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            {(loading || ordersLoading || usersLoading) ? <Loader /> : (
                <div className="col-12 col-md-10 px-5 dashboard">
                    <h1 className="my-4 dashboard__title">Tableau de bord</h1>
                        <div className="row pr-4">
                            <div className="col-xl-12 col-sm-12 mb-3">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center">Montant Total<br /> <b>{`$${totalAmount}`}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pr-4">
                            <div className="col-xl-3 col-sm-6 mb-3 mt-3">
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center">Produits<br /> <b>{productsCount}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                        <span className="float-start">Voir Les Details</span>
                                        <span className="float-end">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3 mt-3">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center">Commandes<br /> <b>{ordersCount}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                        <span className="float-start">Voir Les Details</span>
                                        <span className="float-end">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3 mt-3">
                                <div className="card text-white bg-info o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center">Utilisateurs<br /> <b>{usersCount}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                        <span className="float-start">Voir Les Details</span>
                                        <span className="float-end">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3 mt-3">
                                <div className="card text-white bg-warning o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center">Out of Stock<br /> <b>{outOfStock}</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            )}
                
            </div>
    
    )
}
