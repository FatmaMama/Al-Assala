import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addToCart = (id, quantity, size, stock) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/products/${id}`);
    console.log('product: ', data.product.name);
    console.log('size: ', size);
    console.log('quatity: ', quantity);
    console.log('stock: ', stock)
    dispatch ({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.images[0].url,
            color: data.product.color,
            size,
            quantity,
            stock
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}