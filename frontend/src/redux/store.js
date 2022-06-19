import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUsersReducer, authReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { notifyReducer } from './reducers/notifyReducer';
import { bestSellersReducer, newProductReducer, onSaleProductsReducer, productDetailsByColorReducer, productDetailsReducer, productReducer, productsReducer, searchProductsReducer } from './reducers/productReducers';
import { categoriesReducer, categoryDetailsReducer, categoryReducer, newCategoryReducer } from './reducers/categoryReducer';
import { monthlyOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, ordersReducer, todayYesterdayOrdersReducer, toUpdateOrderReducer, weeklyOrdersReducer } from './reducers/orderReducers';
import { settingsReducer, updateSettingsReducer } from './reducers/settingsReducers';
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
    onSaleProducts: onSaleProductsReducer,
    bestSellers: bestSellersReducer,

    users: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,

    forgotPassword: forgotPasswordReducer,
    
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
    orderToUpdate: toUpdateOrderReducer,

    cart: cartReducer,

    settingsInfos: settingsReducer,
    updateSettings: updateSettingsReducer
});



const initialState = {
    
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
