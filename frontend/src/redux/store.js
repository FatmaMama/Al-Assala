import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUsersReducer, authReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { notifyReducer } from './reducers/notifyReducer';
import { productReducer, productsReducer } from './reducers/productReducers';
import { categoriesReducer, categoryDetailsReducer, categoryReducer } from './reducers/categoryReducer';

const reducers = combineReducers({
    auth: authReducer,
    notify: notifyReducer,
    products: productsReducer,
    product: productReducer,
    users: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    categories: categoriesReducer,
    categoryDetails: categoryDetailsReducer,
    category: categoryReducer
});

let initialState = {

};

const middleWare = [thunk];

const store = createStore(reducers,
                        initialState,
                        composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
