import axios from 'axios';
import { ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CLEAR_ERRORS} from '../constants/product_constants';

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_PRODUCTS_REQUEST})

        const {data} = await axios.get('/api/v1/admin/products');

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_PRODUCT_REQUEST})

        const {data} = await axios.get(`/api/v1/products/${id}`);

        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};


export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({type: NEW_PRODUCT_REQUEST});

        const config= {
            headers: {
                "content-type" : "multipart/form-data"
            }
        }

        const {data} = await axios.post(`/api/v1/products`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};


export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_PRODUCT_REQUEST});

        const {data} = await axios.delete(`/api/v1/products/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST});

        const config= {
            headers: {
                "content-type" : "multipart/form-data"
            }
        }

        const {data} = await axios.patch(`/api/v1/products/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}