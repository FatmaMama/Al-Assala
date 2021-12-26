import {
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
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
}