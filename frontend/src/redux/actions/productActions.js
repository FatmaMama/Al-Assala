import axios from 'axios';
import { ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}