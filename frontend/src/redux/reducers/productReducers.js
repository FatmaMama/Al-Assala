import { ADMIN_PRODUCTS_REQUEST,
        ADMIN_PRODUCTS_SUCCESS,
        ADMIN_PRODUCTS_FAIL,
        CLEAR_ERRORS} from '../constants/product_constants';

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
}