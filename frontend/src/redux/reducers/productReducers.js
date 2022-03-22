import { ADMIN_PRODUCTS_REQUEST,
        ADMIN_PRODUCTS_SUCCESS,
        ADMIN_PRODUCTS_FAIL,
        NEW_PRODUCT_REQUEST,
        NEW_PRODUCT_SUCCESS,
        NEW_PRODUCT_FAIL,
        NEW_PRODUCT_RESET,
        GET_PRODUCT_REQUEST,
        GET_PRODUCT_SUCCESS,
        GET_PRODUCT_FAIL,
        DELETE_PRODUCT_REQUEST,
        DELETE_PRODUCT_SUCCESS,
        DELETE_PRODUCT_FAIL,
        DELETE_PRODUCT_RESET,
        UPDATE_PRODUCT_REQUEST,
        UPDATE_PRODUCT_SUCCESS,
        UPDATE_PRODUCT_FAIL,
        UPDATE_PRODUCT_RESET,
        GET_PRODUCTS_REQUEST,
        GET_PRODUCTS_SUCCESS,
        GET_PRODUCTS_FAIL,
        GET_SEARCH_PRODUCTS_REQUEST,
        GET_SEARCH_PRODUCTS_SUCCESS,
        GET_SEARCH_PRODUCTS_FAIL,
        GET_PRODUCT_BY_COLOR_REQUEST,
        GET_PRODUCT_BY_COLOR_SUCCESS,
        GET_PRODUCT_BY_COLOR_FAIL,
        GET_PRODUCTS_ONSALE_REQUEST,
        GET_PRODUCTS_ONSALE_SUCCESS,
        GET_PRODUCTS_ONSALE_FAIL,
        GET_BEST_SELLERS_REQUEST,
        GET_BEST_SELLERS_SUCCESS,
        GET_BEST_SELLERS_FAIL,
        GET_RELATED_PRODUCTS_REQUEST,
        GET_RELATED_PRODUCTS_SUCCESS,
        GET_RELATED_PRODUCTS_FAIL,
        CLEAR_ERRORS
        } from '../constants/product_constants';

export const productsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ADMIN_PRODUCTS_REQUEST:
        case GET_PRODUCTS_REQUEST:
        case GET_RELATED_PRODUCTS_REQUEST:
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

        case GET_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.numOfProducts,
                resPerPage: action.payload.resPerPage
            }
        
        case GET_RELATED_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        
        case ADMIN_PRODUCTS_FAIL:
        case GET_PRODUCTS_FAIL:
        case GET_RELATED_PRODUCTS_FAIL:
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


export const searchProductsReducer = (state = {searchProducts: []}, action) => {
    switch (action.type) {
        case GET_SEARCH_PRODUCTS_REQUEST:
            return {
                loading: true,
                searchProducts: []
            }

        case GET_SEARCH_PRODUCTS_SUCCESS:
            return {
                loading: false,
                searchProducts: action.payload.products,
                productsCount: action.payload.numOfProducts,
                resPerPage: action.payload.resPerPage
            }
        case GET_SEARCH_PRODUCTS_FAIL:
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


export const onSaleProductsReducer = (state = {onSaleProducts: []}, action) => {
    switch (action.type) {
        case GET_PRODUCTS_ONSALE_REQUEST:
            return {
                loading: true,
                onSaleProducts: []
            }

        case GET_PRODUCTS_ONSALE_SUCCESS:
            return {
                loading: false,
                onSaleProducts: action.payload.onSaleProducts,
                productsCount: action.payload.numOfProducts
            }
        case GET_PRODUCTS_ONSALE_FAIL:
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


export const bestSellersReducer = (state = {bestSellers: []}, action) => {
    switch (action.type) {
        case GET_BEST_SELLERS_REQUEST:
            return {
                loading: true,
                bestSellers: []
            }

        case GET_BEST_SELLERS_SUCCESS:
            return {
                loading: false,
                bestSellers: action.payload
            }
        case GET_BEST_SELLERS_FAIL:
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


export const newProductReducer = (state= { product: {}}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: true
            }
        case NEW_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_PRODUCT_RESET:
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


export const productDetailsReducer = (state= { product: {}}, action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: true
            }
        case GET_PRODUCT_FAIL:
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

export const productDetailsByColorReducer = (state= { productByColor: {}}, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_COLOR_REQUEST: 
            return {
                ...state,
                loading: true
            }
        
        case GET_PRODUCT_BY_COLOR_SUCCESS:
            return {
                loading: false,
                productByColor: action.payload,
                success: true
            }
        
        case GET_PRODUCT_BY_COLOR_FAIL:
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


export const productReducer = (state= { }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST: 
        case UPDATE_PRODUCT_REQUEST:
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
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
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
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        default:
            return state
    }
}