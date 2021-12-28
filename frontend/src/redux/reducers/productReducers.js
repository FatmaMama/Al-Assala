import { ADMIN_PRODUCTS_REQUEST,
        ADMIN_PRODUCTS_SUCCESS,
        ADMIN_PRODUCTS_FAIL,
        DELETE_PRODUCT_REQUEST,
        DELETE_PRODUCT_SUCCESS,
        DELETE_PRODUCT_FAIL,
        CLEAR_ERRORS,
        DELETE_PRODUCT_RESET} from '../constants/product_constants';

export const productsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.numOfProducts
            }
        
        case ADMIN_PRODUCTS_FAIL:
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
            return state;
    }
};


export const productReducer = (state= { }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST: 
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        default:
            return state
    }
}