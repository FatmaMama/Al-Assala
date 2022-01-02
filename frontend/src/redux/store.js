import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUsersReducer, authReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { notifyReducer } from './reducers/notifyReducer';
import { newProductReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/productReducers';
import { categoriesReducer, categoryDetailsReducer, categoryReducer, newCategoryReducer } from './reducers/categoryReducer';
import { monthlyOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, ordersReducer, todayYesterdayOrdersReducer, weeklyOrdersReducer } from './reducers/orderReducers';
import { settingsReducer } from './reducers/settingsReducers';

const reducers = combineReducers({
    auth: authReducer,
    notify: notifyReducer,

    products: productsReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,

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
    settings : JSON.parse(localStorage.getItem('settingsInfo'))
};

const middleWare = [thunk];

const store = createStore(reducers,
                        initialState,
                        composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
