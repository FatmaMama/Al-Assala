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
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_SEARCH_PRODUCTS_REQUEST,
    GET_SEARCH_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS_FAIL,
    GET_PRODUCT_BY_COLOR_REQUEST,
    GET_PRODUCT_BY_COLOR_SUCCESS,
    GET_PRODUCT_BY_COLOR_FAIL,
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

export const getProducts = (currentPage = 1, category='') => async (dispatch) => {
    try {
        dispatch({ type : GET_PRODUCTS_REQUEST });
       
        let link = `/api/v1/products?page=${currentPage}&category=${category}`;

        const { data } = await axios.get(link);
      
        dispatch({ 
            type : GET_PRODUCTS_SUCCESS,
            payload : data
         })
         

    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getSearchProducts = (keyword='', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type : GET_SEARCH_PRODUCTS_REQUEST });
        
        let link = `/api/v1/search/products?keyword=${keyword}&page=${currentPage}`;

        const { data } = await axios.get(link);
      
        dispatch({ 
            type : GET_SEARCH_PRODUCTS_SUCCESS,
            payload : data
         })
         

    } catch (error) {
        dispatch({
            type: GET_SEARCH_PRODUCTS_FAIL,
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


export const getProductByColor = (color, name) => async (dispatch) => {
    try {
        dispatch({type: GET_PRODUCT_BY_COLOR_REQUEST})

        const {data} = await axios.get(`/api/v1/products/${color}/${name}`);
        
        dispatch({
            type: GET_PRODUCT_BY_COLOR_SUCCESS,
            payload: data.product[0]
        })
        
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_BY_COLOR_FAIL,
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