import { GET_SETTINGS, SET_SETTINGS } from "../constants/settingsConstants";

export const getSettings = () => (dispatch) => {

    const settings = JSON.parse(localStorage.getItem('settingsInfo'));
    console.log('settings: ', settings)
    dispatch({
        type : GET_SETTINGS,
        payload : settings
    })
};


export const updateSettings = (settingsData) => (dispatch) => {

    const settings = JSON.parse(localStorage.getItem('settingsInfo'));
        settings.shippingPrice = settingsData.shippingPrice;
        settings.shippingFreeLimit = settingsData.shippingFreeLimit;
        settings.shippingDuration = settingsData.shippingDuration;
        settings.coupon = settingsData.coupon;
        settings.saleCoupon = settingsData.saleCoupon;
        settings.saleDuration = settingsData.saleDuration;
    
    localStorage.setItem('settingsInfo', JSON.stringify(settings))

    dispatch({
        type : SET_SETTINGS,
        payload : settings
    })
};