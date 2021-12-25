import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_RESET,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from '../constants/userConstants';


export const authReducer = (state = { user : {}}, action) => {
    switch(action.type){
        case LOGIN_REQUEST: 
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading : true,
                isAuthenticated : false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading : false,
                isAuthenticated : false,
                isLogout: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading : false,
                isAuthenticated : false,
                user : null,
                error : action.payload
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                error: action.payload
            }

        case LOGOUT_RESET:
            return {
                ...state,
                isLogout: false
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user : null,
                error : action.payload
            }
        case CLEAR_ERRORS :
                return {
                    ...state,
                    error: null
                }

        default :
            return state
    }
};


export const allUsersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                users: []
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                usersCount: action.payload.numOfUsers
            }
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
};

export const userReducer = (state= {user: {}}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST: 
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_USER_FAIL:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        default:
            return state
    }
};

export const userDetailsReducer = (state= {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST: 
            return {
                ...state,
                loading: true
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
};