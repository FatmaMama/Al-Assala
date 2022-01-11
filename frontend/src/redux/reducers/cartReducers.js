import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const cartReducer = (state= { cartItems : []}, action) => {
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
                cartItems : state.cartItems.filter(i => i.product !== action.payload.id && i.size !== action.payload.size)
            }

        default:
            return state
    }
}