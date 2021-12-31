import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUsersReducer, authReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { notifyReducer } from './reducers/notifyReducer';
import { newProductReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/productReducers';
import { categoriesReducer, categoryDetailsReducer, categoryReducer, newCategoryReducer } from './reducers/categoryReducer';
import { newOrderReducer, orderDetailsReducer, orderReducer, ordersReducer } from './reducers/orderReducers';

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
    newOrder: newOrderReducer
});

let initialState = {

};

const middleWare = [thunk];

const store = createStore(reducers,
                        initialState,
                        composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
