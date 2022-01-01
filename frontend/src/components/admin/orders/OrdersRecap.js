import React from 'react';
import Sidebar from '../../layouts/Sidebar';
import { Link } from 'react-router-dom';

export default function OrdersRecap() {
    return (
        <div className="row">
        <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
            <Sidebar />
        </div>

        <div className="col-12 col-md-10 px-5 dashboard">
            <h1 className="text-uppercase my-5" >Récapitulation des commandes</h1>
            <div className='row'>
                <div className="col-lg-6 col-12 mb-3 mt-3">
                    <div className="card text-white bg-info o-hidden h-100">
                        <div className="card-body">
                            <div className="text-center"><i className="fas fa-question-circle me-3"></i>Commandes Non Traitées</div>
                        </div>
                        <Link className="card-footer text-white clearfix small z-1" to="#">
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
                            <div className="text-center"><i className="fas fa-shipping-fast me-3"></i>Commandes Expédiées</div>
                        </div>
                        <Link className="card-footer text-white clearfix small z-1" to="#">
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
                            <div className="text-center"><i className="fas fa-money-bill-alt me-3"></i>Commandes Livrées</div>
                        </div>
                        <Link className="card-footer text-white clearfix small z-1" to="#">
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
                            <div className="text-center"><i className="fas fa-angry me-3"></i>Commandes Retournées</div>
                        </div>
                        <Link className="card-footer text-white clearfix small z-1" to="#">
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
