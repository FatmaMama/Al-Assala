import { ADD_TO_CART, REMOVE_CART_ITEM, RESET_CART_ITEM, SHIPPING_INFO  } from "../constants/cartConstants";

export const cartReducer = (state= { cartItems : [], shippingInfo : {}}, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload
            const isItemExist = state.cartItems.find(i => i.product === item.product && i.size === item.size)

            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product && i.size === item.size ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_CART_ITEM :
            return {
                ...state,
                cartItems : state.cartItems.filter(i => {if(i.product !== action.payload.id || (i.size !== action.payload.size && i.product === action.payload.id)) {
                    return true
                } else {
                    return false
                }} )
            }

        case RESET_CART_ITEM :
            return {
                ...state,
                cartItems : []
            }

        case SHIPPING_INFO:
            return {
                ...state,
                shippingInfo : action.payload
            }

        default:
            return state
    }
}