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
    GET_MONTHLY_ORDERS_REQUEST,
    GET_MONTHLY_ORDERS_SUCCESS,
    GET_MONTHLY_ORDERS_FAIL,
    GET_WEEKLY_ORDERS_REQUEST,
    GET_WEEKLY_ORDERS_SUCCESS,
    GET_WEEKLY_ORDERS_FAIL,
    GET_TODAY_ORDERS_REQUEST,
    GET_TODAY_ORDERS_SUCCESS,
    GET_TODAY_ORDERS_FAIL,
    REMOVE_ORDER_ITEM,
    ADD_TO_UPDATE_ORDER,
    CLEAR_ERRORS,
    TO_UPDATE_ORDER
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
};


export const todayYesterdayOrdersReducer = (state= {todayYesterdayOrders: []}, action) => {
    switch (action.type) {
        case GET_TODAY_ORDERS_REQUEST:
            return {
                loading: true,
                todayYesterdayOrders: []
            }

        case GET_TODAY_ORDERS_SUCCESS:
            return {
                loading: false,
                todayYesterdayOrders: action.payload
            }

        case GET_TODAY_ORDERS_FAIL:
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

export const weeklyOrdersReducer = (state= {weeklyOrders: []}, action) => {
    switch (action.type) {
        case GET_WEEKLY_ORDERS_REQUEST:
            return {
                loading: true,
                weeklyOrders: []
            }
            
        case GET_WEEKLY_ORDERS_SUCCESS:
            return {
                loading: false,
                weeklyOrders: action.payload
            }

        case GET_WEEKLY_ORDERS_FAIL:
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


export const monthlyOrdersReducer = (state= {monthlyOrders: []}, action) => {
    switch (action.type) {
        case GET_MONTHLY_ORDERS_REQUEST:
            return {
                loading: true,
                monthlyOrders: []
            }
            
        case GET_MONTHLY_ORDERS_SUCCESS:
            return {
                loading: false,
                monthlyOrders: action.payload
            }

        case GET_MONTHLY_ORDERS_FAIL:
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


export const toUpdateOrderReducer = (state= {toUpdateOrder: {}}, action) => {
    switch (action.type) {
        case TO_UPDATE_ORDER:
            return {
                ...state,
                toUpdateOrder : action.payload
            }

        case ADD_TO_UPDATE_ORDER:
            const item = action.payload
            const isItemExist = state.toUpdateOrder.orderItems.find(i => i.product === item.product && i.size === item.size)

            if(isItemExist){
                return {
                    ...state,
                    toUpdateOrder: {...state.toUpdateOrder, orderItems : state.toUpdateOrder.orderItems.map(i => i.product === isItemExist.product && i.size === item.size ? item : i)}
                }
            } else {
                return {
                    ...state,
                    toUpdateOrder: {...state.toUpdateOrder, orderItems : [...state.toUpdateOrder.orderItems, item]}
                }
            }

        case REMOVE_ORDER_ITEM :
            return {
                ...state,
                toUpdateOrder : {...state.toUpdateOrder, orderItems : state.toUpdateOrder.orderItems.filter(i => {if(i.product !== action.payload.id || (i.size !== action.payload.size && i.product === action.payload.id)) {
                    return true
                } else {
                    return false
                }} )}
        }

        default:
            return state
    }
};
