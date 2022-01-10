import { ADD_TO_CART } from "../constants/cartConstants";

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

        default:
            return state
    }
}