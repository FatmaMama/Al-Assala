import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';


////////////////////////////////////////
//////// AUTH ACTIONS  //////////
///////////////////////////////////////
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        const {data} = await axios.post('/api/v1/login', {email, password}, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });
  
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message 
        })
    }
};


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_REQUEST});

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const {data} = await axios.post('/api/v1/signup', userData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        });
   
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message 
        })
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout');
 
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message 
        })
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get('/api/v1/me');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message 
        })
    }
};

////////////////////////////////////////
//////// ADMIN USERS ACTIONS  //////////
///////////////////////////////////////
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USERS_REQUEST});

        const {data} = await axios.get('/admin/users');

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}