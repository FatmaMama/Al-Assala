import { SET_SETTINGS } from "../constants/settingsConstants";

export const getSettings = (settingsData) => (dispatch) => {

    const settings = JSON.parse(localStorage.getItem('settingsInfo'));
        settings.shippingPrice = settingsData.shippingPrice;
        settings.shippingFreeLimit = settingsData.shippingPrice;
        settings.shippingDuration = settingsData.shippingPrice;
        settings.coupon = settingsData.shippingPrice;
        settings.saleCoupon = settingsData.shippingPrice;
        settings.saleDuration = settingsData.shippingPrice;
    
    localStorage.setItem('settingInfo', JSON.stringify(settings))

    dispatch({
        type : SET_SETTINGS,
        payload : settings
    })
};