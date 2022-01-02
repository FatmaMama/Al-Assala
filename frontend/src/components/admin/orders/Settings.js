import React, { useState } from 'react';
import Sidebar from '../../layouts/Sidebar';

export default function Settings() {


    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10 px-5">
                <h1 className="text-uppercase my-5" >Paramètres des commandes</h1>
                <form >
                    <div className='row'>
                        <div className='col-12 col-lg-6 px-5 mt-5'>
                            <h1 className="pb-3">Paramètres de Livraison</h1>
                            <div className="form-group">
                                <label htmlFor="firstName_field">Frais de Livraison:</label>
                                <input 
                                    type="name" 
                                    id="firstName_field" 
                                    className="form-control" 
                                    name="firstName" 
                                    value=''
                                    
                                    />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="lastName_field">Livraison Gratuite à partir de:</label>
                                <input 
                                    type="name" 
                                    id="lastName_field" 
                                    className="form-control" 
                                    name="lastName" 
                                    value=''
                                    />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="email_field">Durée:</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name="email" 
                                    value=''
                                
                                />
                            </div>
                        </div>

                        <div className='col-12 col-lg-6 px-5 mt-5'>
                            <h1 className="pb-3">Paramètres des Coupons</h1>
                            <div className="form-group">
                                <label htmlFor="firstName_field">Coupon:</label>
                                <input 
                                    type="name" 
                                    id="firstName_field" 
                                    className="form-control" 
                                    name="firstName" 
                                    value=''
                                    
                                    />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="lastName_field">Promotion liée au coupon:</label>
                                <input 
                                    type="name" 
                                    id="lastName_field" 
                                    className="form-control" 
                                    name="lastName" 
                                    value=''
                                    />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="email_field">Durée de la promotion:</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name="email" 
                                    value=''
                                
                                />
                            </div>
                        </div>

                    </div>
                        
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-5 col-12 d-flex justify-content-center'>
                            <button className="btn mt-5 order_button">
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
