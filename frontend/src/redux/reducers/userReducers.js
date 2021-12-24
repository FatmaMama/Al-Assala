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
    CLEAR_ERRORS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET
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
                user : null
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

        case DELETE_USER_FAIL:
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

        default:
            return state
    }
}