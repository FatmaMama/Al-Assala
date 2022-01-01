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
    DELETE_ORDER_RESET,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    NEW_ORDER_RESET,
    GET_MY_ORDERS_REQUEST,
    GET_MY_ORDERS_SUCCESS,
    GET_MY_ORDERS_FAIL,
    GET_BY_STATUS_ORDERS_REQUEST,
    GET_BY_STATUS_ORDERS_SUCCESS,
    GET_BY_STATUS_ORDERS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';

export const ordersReducer = (state= { orders: []}, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
        case GET_MY_ORDERS_REQUEST:
        case GET_BY_STATUS_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                ordersCount: action.payload.numOfOrders,
                totalAmount: action.payload.totalAmount
            }
        case GET_MY_ORDERS_SUCCESS:
        case GET_BY_STATUS_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ALL_ORDERS_FAIL:
        case GET_MY_ORDERS_FAIL:
        case GET_BY_STATUS_ORDERS_FAIL:
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

export const newOrderReducer = (state= { order: {}}, action) => {
    switch (action.type) {
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }
        case NEW_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_ORDER_RESET:
            return {
                ...state,
                success: false
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


export const orderDetailsReducer = (state= { order: {}}, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                success: true
            }
        case GET_ORDER_FAIL:
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


export const orderReducer = (state= { }, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_ORDER_RESET:
            return {
                loading: false,
                isDeleted: false
            }
        case UPDATE_ORDER_RESET:
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