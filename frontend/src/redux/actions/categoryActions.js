import axios from './http-common';
import {
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    CLEAR_ERRORS
} from '../constants/categoryConstants';

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({type: ALL_CATEGORIES_REQUEST});

        const {data} = await axios.get('/api/v1/categories');

        dispatch({
            type: ALL_CATEGORIES_SUCCESS,
            payload: data.categoryList
        })
        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getCategory = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_CATEGORY_REQUEST});

        const {data} = await axios.get(`/api/v1/categories/${id}`);

        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: data.category
        })
        
    } catch (error) {
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const newCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({type: NEW_CATEGORY_REQUEST});

        const config = {
            headers: {
                "content-type" : "application/json"
            }
        }

        const {data} = await axios.post('/api/v1/categories', categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data.category
        })
        
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_CATEGORY_REQUEST});

        const {data} = await axios.delete(`/api/v1/categories/${id}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_CATEGORY_REQUEST});

        const config = {
            headers: {
                "content-type" : "application/json"
            }
        }

        const {data} = await axios.patch(`/api/v1/categories/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
} 