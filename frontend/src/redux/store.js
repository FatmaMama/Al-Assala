import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUsersReducer, authReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { notifyReducer } from './reducers/notifyReducer';
import { newProductReducer, productDetailsByColorReducer, productDetailsReducer, productReducer, productsReducer, searchProductsReducer } from './reducers/productReducers';
import { categoriesReducer, categoryDetailsReducer, categoryReducer, newCategoryReducer } from './reducers/categoryReducer';
import { monthlyOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, ordersReducer, todayYesterdayOrdersReducer, weeklyOrdersReducer } from './reducers/orderReducers';
import { settingsReducer } from './reducers/settingsReducers';
import { cartReducer } from './reducers/cartReducers';

const reducers = combineReducers({
    auth: authReducer,
    notify: notifyReducer,

    products: productsReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    productDetailsByColor: productDetailsByColorReducer,
    newProduct: newProductReducer,
    searchProducts: searchProductsReducer,

    users: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    
    categories: categoriesReducer,
    categoryDetails: categoryDetailsReducer,
    category: categoryReducer,
    newCategory: newCategoryReducer,

    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
    todayYesterdayOrders: todayYesterdayOrdersReducer,
    weeklyOrders: weeklyOrdersReducer,
    monthlyOrders: monthlyOrdersReducer,

    cart: cartReducer,

    settingsInfos: settingsReducer
});

//Check for settings in localstorage
if(localStorage.getItem('settingsInfo') == null){
    const defaultSettings = {
        shippingPrice : 0,
        shippingFreeLimit : 0,
        shippingDuration : 0,
        coupon: '',
        saleCoupon: 0,
        saleDuration: 0
    };

    localStorage.setItem('settingsInfo', JSON.stringify(defaultSettings))
}

const initialState = {
    settingsInfos : {
        settings : JSON.parse(localStorage.getItem('settingsInfo'))
    },
    cart : {
        cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
        cartPrice : localStorage.getItem('cartPrice') ? JSON.parse(localStorage.getItem('cartPrice')) : {}
    }
};

const middleWare = [thunk];

const store = createStore(reducers,
                        initialState,
                        composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
