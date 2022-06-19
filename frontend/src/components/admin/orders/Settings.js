import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../../redux/actions/settingsActions';
import { clearErrors } from '../../../redux/actions/orderActions';
import { notifyUser } from '../../../redux/actions/notifyActions';
import Sidebar from '../../layouts/Sidebar';
import Alert from '../../utils/Alert';
import { useNavigate} from 'react-router-dom';

export default function Settings() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newSettings, setNewSettings] = useState({
        shippingPrice : 0,
        shippingFreeLimit : 0,
        shippingDuration : 0,
        coupon: '',
        saleCoupon: 0,
        saleDuration: 0
    });


    const { message, messageType }= useSelector(state => state.notify);
    const {shippingPrice, shippingFreeLimit, shippingDuration, coupon, saleCoupon, saleDuration} = newSettings;
    const {error, isUpdated} = useSelector(state => state.updateSettings)

    useEffect(() => {
        
        if(isUpdated){
            navigate('/');
        };

        if(error){
            dispatch(notifyUser(error, 'error'));
            setTimeout(() => dispatch(clearErrors()), 5000)
        };
           
            
    }, [dispatch, error, isUpdated]);

    const changeData = (e) => {
        e.preventDefault();
        setNewSettings({...newSettings, [e.target.name] : e.target.value})
    };

    const updateHandler = (e) => {
        e.preventDefault();
        let TodayDate1 = new Date();
        let TodayDate2 = new Date();
        let resultShipping = TodayDate1.setDate(TodayDate1.getDate() + Number(newSettings.shippingDuration));
        let resultSale = TodayDate2.setDate(TodayDate2.getDate() + Number(newSettings.saleDuration));

        newSettings.shippingDuration = new Date(resultShipping);
        newSettings.saleDuration = new Date(resultSale);
    
        dispatch(updateSettings(newSettings))
    }

    return (
        <div className="row">
            <div className="col-12 col-md-2 pt-3 bg-dark min-vh-100">
                <Sidebar />
            </div>
            {error && <Alert message={message} messageType={messageType} /> }
            <div className="col-12 col-md-10 px-5">
                <h1 className="text-uppercase my-5" >Paramètres des commandes</h1>
               
                <form >
                    <div className='row'>
                        <div className='col-12 col-lg-6 px-5 mt-5'>
                            <h1 className="pb-3">Paramètres de Livraison</h1>
                           
                            <div className="form-group">
                                <label htmlFor="shippingPrice_field">Frais de Livraison:</label>
                                <input 
                                    type="text" 
                                    id="shippingPrice_field" 
                                    className="form-control fs-4" 
                                    name="shippingPrice" 
                                    value={shippingPrice}
                                    onChange={changeData}
                                />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="shippingFreeLimit_field">Livraison Gratuite à partir de:</label>
                                <input 
                                    type="text" 
                                    id="shippingFreeLimit_field" 
                                    className="form-control fs-4" 
                                    name="shippingFreeLimit" 
                                    value={shippingFreeLimit}
                                    onChange={changeData}
                                />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="shippingDuration_field">Durée:</label>
                                <input
                                    type="text"
                                    id="shippingDuration_field"
                                    className="form-control fs-4"
                                    name="shippingDuration" 
                                    value={shippingDuration}
                                    onChange={changeData}
                                />
                            </div>
                        </div>

                        <div className='col-12 col-lg-6 px-5 mt-5'>
                            <h1 className="pb-3">Paramètres des Coupons</h1>
                            <div className="form-group">
                                <label htmlFor="coupon_field">Coupon:</label>
                                <input 
                                    type="text" 
                                    id="coupon_field" 
                                    className="form-control fs-4" 
                                    name="coupon" 
                                    value={coupon}
                                    onChange={changeData}
                                />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="saleCoupon_field">Promotion liée au coupon:</label>
                                <input 
                                    type="text" 
                                    id="saleCoupon_field" 
                                    className="form-control fs-4" 
                                    name="saleCoupon" 
                                    value={saleCoupon}
                                    onChange={changeData}
                                />
                            </div>

                            <div className="form-group pt-3">
                                <label htmlFor="saleDuration_field">Durée de la promotion:</label>
                                <input
                                    type="text"
                                    id="saleDuration_field"
                                    className="form-control fs-4"
                                    name="saleDuration" 
                                    value={saleDuration}
                                    onChange={changeData}
                                />
                            </div>
                        </div>

                    </div>
                        
                    <div className='row d-flex justify-content-center mt-5'>
                        <div className='col-md-5 col-12 d-flex justify-content-center'>
                            <button className="btn mt-5 btn--1" onClick={updateHandler}>
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
