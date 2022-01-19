import axios from 'axios';
import {
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    GET_MY_ORDERS_REQUEST,
    GET_MY_ORDERS_SUCCESS,
    GET_MY_ORDERS_FAIL,
    GET_BY_STATUS_ORDERS_REQUEST,
    GET_BY_STATUS_ORDERS_SUCCESS,
    GET_BY_STATUS_ORDERS_FAIL,
    GET_MONTHLY_ORDERS_REQUEST,
    GET_MONTHLY_ORDERS_SUCCESS,
    GET_MONTHLY_ORDERS_FAIL,
    GET_WEEKLY_ORDERS_REQUEST,
    GET_WEEKLY_ORDERS_SUCCESS,
    GET_WEEKLY_ORDERS_FAIL,
    GET_TODAY_ORDERS_REQUEST,
    GET_TODAY_ORDERS_SUCCESS,
    GET_TODAY_ORDERS_FAIL,
    REMOVE_ORDER_ITEM,
    ADD_TO_UPDATE_ORDER,
    CLEAR_ERRORS,
    TO_UPDATE_ORDER
} from '../constants/orderConstants';


export const getOrders = () => async (dispatch) => {
    try {
        dispatch({type: ALL_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/admin/orders');

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({type: GET_MY_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/orders/me');
        
        dispatch({
            type: GET_MY_ORDERS_SUCCESS,
            payload: data.myOrders
        })
        
    } catch (error) {
        dispatch({
            type: GET_MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getOrder = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_ORDER_REQUEST});

        const {data} = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data.order
        })
        
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const newOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({type: NEW_ORDER_REQUEST});

        const config = {
            headers: {
                "content-type" : "application/json"
            }
        }

        const {data} = await axios.post('/api/v1/order', orderData, config);

        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: data.order
        })
        
    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_ORDER_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/orders/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_ORDER_REQUEST});

        const config = {
            headers: {
                "content-type" : "application/json"
            }
        }

        const {data} = await axios.patch(`/api/v1/admin/orders/${id}`, orderData, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getByStatusOrders = () => async (dispatch) => {
    try {
        dispatch({type: GET_BY_STATUS_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/admin/status/orders');
        
        dispatch({
            type: GET_BY_STATUS_ORDERS_SUCCESS,
            payload: data.plan
        })
        
    } catch (error) {
        dispatch({
            type: GET_BY_STATUS_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getMonthlyOrders = () => async (dispatch) => {
    try {
        dispatch({type: GET_MONTHLY_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/admin/monthly/orders');
        
        dispatch({
            type: GET_MONTHLY_ORDERS_SUCCESS,
            payload: data.plan
        })
        
    } catch (error) {
        dispatch({
            type: GET_MONTHLY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getWeeklyOrders = () => async (dispatch) => {
    try {
        dispatch({type: GET_WEEKLY_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/admin/weekly/orders');
        
        dispatch({
            type: GET_WEEKLY_ORDERS_SUCCESS,
            payload: data.plan
        })
        
    } catch (error) {
        dispatch({
            type: GET_WEEKLY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getTodayOrders = () => async (dispatch) => {
    try {
        dispatch({type: GET_TODAY_ORDERS_REQUEST});

        const {data} = await axios.get('/api/v1/admin/today/orders');
        
        dispatch({
            type: GET_TODAY_ORDERS_SUCCESS,
            payload: data.plan
        })
        
    } catch (error) {
        dispatch({
            type: GET_TODAY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getToUpdateOrder = (data) => (dispatch) => {

    dispatch({
        type: TO_UPDATE_ORDER,
        payload: data
    });
};

export const addToUpdateOrder = (id, quantity, size) => async (dispatch) => {
    const {data} = await axios.get(`/api/v1/products/${id}`);
    
    let salePrice;
    if(data.product.sale !== 0){
        salePrice = data.product.price * (1 - data.product.sale)
    } else {
        salePrice = 0
    }

    dispatch ({
        type: ADD_TO_UPDATE_ORDER,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.images[0].url,
            color: data.product.color,
            price: data.product.price,
            salePrice,
            size,
            quantity,
        }
    });
};

export const removeFromOrder = (id, size) => (dispatch) => {

    dispatch({
        type: REMOVE_ORDER_ITEM,
        payload: {
            id,
            size
        }
    });
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
} 