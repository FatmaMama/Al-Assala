import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/userReducers';
import { notifyReducer } from './reducers/notifyReducer';
import { productsReducer } from './reducers/productReducers';

const reducers = combineReducers({
    auth: authReducer,
    notify: notifyReducer,
    products: productsReducer
});

let initialState = {

};

const middleWare = [thunk];

const store = createStore(reducers,
                        initialState,
                        composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
