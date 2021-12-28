import {
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,
    CLEAR_ERRORS
} from '../constants/categoryConstants';

export const categoriesReducer = (state= { categories: []}, action) => {
    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
            return {
                loading: true,
                categories: []
            }
        case ALL_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            }
        case ALL_CATEGORIES_FAIL:
            return {
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


export const categoryDetailsReducer = (state= { category: {}}, action) => {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload
            }
        case GET_CATEGORY_FAIL:
            return {
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
}


export const categoryReducer = (state= { }, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_CATEGORY_RESET:
            return {
                loading: false,
                isDeleted: false
            }
        case UPDATE_CATEGORY_RESET:
            return {
                loading: false,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}