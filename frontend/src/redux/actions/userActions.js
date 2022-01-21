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
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
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
        const {data} = await axios.get('/api/v1/logout');
 
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data.success
        });
        
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

        const {data} = await axios.get('/api/v1/admin/users');

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
};


export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/admin/users/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })
        
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/users/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST});

        const config = {
            headers: {
                "content-type" : "application/json"
            }
        }

        const {data} = await axios.patch(`/api/v1/admin/users/${id}`, userData, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

////////////////////////////////////////
//////// USER ACTIONS  //////////
///////////////////////////////////////
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
 
        const config = {
            headers: {
                "content-type" : "multipart/form-data"
            }
        }
 
        const { data } = await axios.patch('/api/v1/user/update', userData, config);
 
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type : UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}