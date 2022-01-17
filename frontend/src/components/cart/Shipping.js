import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../redux/actions/cartActions';
import Menu from '../layouts/Menu'
import CheckoutSteps from './CheckoutSteps'

export default function Shipping() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector(state => state.cart);

    const [address,setAddress] = useState(shippingInfo.address);
    const [city,setCity] = useState(shippingInfo.city);
    const [phoneNo,setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode,setPostalCode] = useState(shippingInfo.postalCode);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country: 'Tunisia'}));
        navigate('/order/confirm')
    };

    return (
        <div>
            <Menu />
            <CheckoutSteps shipping />

            <div className="row shipping">
                <div className="col-12 col-md-9">
                    <form onSubmit={submitHandler}>
                        <h1 className="text-center mb-4">Informations de livraison</h1>
                        <div className="form-group mb-4">
                            <label for="address_field">Adresse</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control mt-1"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label for="city_field">Ville</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control mt-1"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label for="country_field">Pays</label>
                            <input
                                type="text"
                                id="country_field"
                                className="form-control mt-1"
                                value='Tunisie'
                                readOnly
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="phone_field">Téléphone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control mt-1"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label for="postal_code_field">Code Postal</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control mt-1"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-5 col-12 d-flex justify-content-center'>
                                <button id="shipping_btn" type="submit" className="btn mt-5 btn--1">
                                    continuer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
