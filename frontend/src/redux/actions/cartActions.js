import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const addToCart = (id, quantity, size, stock) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/products/${id}`);
    
    let salePrice;
    if(data.product.sale !== 0){
        salePrice = data.product.price * (1 - data.product.sale)
    } else {
        salePrice = 0
    }

    dispatch ({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.images[0].url,
            color: data.product.color,
            price: data.product.price,
            salePrice,
            size,
            quantity,
            stock
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const removeFromCart = (id, size) => (dispatch, getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: {
            id,
            size
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};