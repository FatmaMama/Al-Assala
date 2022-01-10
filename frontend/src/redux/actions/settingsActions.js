import { GET_SETTINGS, SET_SETTINGS } from "../constants/settingsConstants";

export const getSettings = () => (dispatch) => {

    const settings = JSON.parse(localStorage.getItem('settingsInfo'));
    console.log('settings', settings)
    dispatch({
        type : GET_SETTINGS,
        payload : settings
    })
};


export const updateSettings = (settingsData) => (dispatch) => {

    let TodayDate1 = new Date();
    let TodayDate2 = new Date();
    let resultShipping = TodayDate1.setDate(TodayDate1.getDate() + Number(settingsData.shippingDuration));
    let resultSale = TodayDate2.setDate(TodayDate2.getDate() + Number(settingsData.saleDuration));

    const settings = JSON.parse(localStorage.getItem('settingsInfo'));
        settings.shippingPrice = settingsData.shippingPrice;
        settings.shippingFreeLimit = settingsData.shippingFreeLimit;
        settings.shippingDuration = new Date(resultShipping);
        settings.coupon = settingsData.coupon;
        settings.saleCoupon = settingsData.saleCoupon;
        settings.saleDuration = new Date(resultSale);
    
    localStorage.setItem('settingsInfo', JSON.stringify(settings))

    dispatch({
        type : SET_SETTINGS,
        payload : settings
    })
};