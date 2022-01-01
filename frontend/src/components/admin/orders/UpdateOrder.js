import React from 'react';
import Sidebar from '../../layouts/Sidebar';

export default function UpdateOrder() {
    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10 px-5 order">
                <h1 className="text-uppercase my-5" >Mettre à jour la commande</h1>

                        <div className="my-4">
                            <span className="me-4 order__title">Commande # 4543f34f545</span>
                            <span><b>( 2022-01-01 )</b></span>
                        </div>

                        <div className='row mt-5'>
                            <div className="col-12 col-lg-6 ps-5 mt-4">
                                <span className="pb-4 order__subTitle">Informations d'expédition</span>
                                <p><b className='me-2'>Nom:</b> John</p>
                                <p><b className='me-2'>Téléphone:</b> 111 111 1111</p>
                                <p className="mb-4"><b className='me-2'>Adresse:</b>Address of user</p>
                            </div>

                            <div className="col-12 col-lg-6 px-5 mt-4">
                                <div>
                                    <span className="pb-4 me-3 order__subTitle">Paiment:</span>
                                    <span className='text-uppercase'>payé</span>
                                </div>
                                
                                <div>
                                    <span className="pb-4 me-3 order__subTitle">Statut de la commande:</span>
                                    <span>Delivered</span> 
                                </div>
                                
                                <div>
                                    <span className="me-3 order__subTitle">Montant:</span>
                                    <span>$145</span>
                                </div>
                                
                            </div>
                        </div>

                        <div className='mt-5'>
                            <h4 className="order__subTitle">(4) Produits commandés:</h4>

                            <hr />
                            <div className="my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src='' alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <a href="#">Mic</a>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>$33</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>2 Piece(s)</p>
                                    </div>
                                </div>
                            </div>
                        <hr />
                        
                            <div className="row">
                                <div className="col-4 col-lg-4">
                                    <p>Sous-total</p>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <p>(3) articles</p>
                                </div>


                                <div className="col-3 col-lg-3">
                                    <p>$33</p>
                                </div>
                            </div>
                       
                            <div className="row">
                                <div className="col-4 col-lg-4">
                                    <p>Expédition</p>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <p>Livraison 3-4 jours</p>
                                </div>


                                <div className="col-3 col-lg-3">
                                    <p>$7.00</p>
                                </div>
                            </div>
                       

                        
                            <div className="row">
                                <div className="col-4 col-lg-4">
                                    <p><b>Total</b></p>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <p></p>
                                </div>


                                <div className="col-3 col-lg-3">
                                    <p><b>$84.000</b></p>
                                </div>
                            </div>
                        
                    </div>

                    <div className='mt-5'>
                        <h4 className="order__subTitle">Statut</h4>
                        <div className='row'>
                            <div className='col-md-3 col-12'>
                                <div className="form-group">
                                    <select
                                        className="form-control fs-4"
                                        name='status'
                                        value=''
                                    >
                                        <option value="Processing">non-traitée</option>
                                        <option value="Shipped">expédiée</option>
                                        <option value="Delivered">livrée</option>
                                        <option value="Delivered">retournée</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-5 col-12 d-flex justify-content-center'>
                            <button className="btn mt-5 order_button">
                                Mettre à jour la commande
                            </button>
                        </div>
                    </div>
                    
            </div>
		</div>
    )
}
