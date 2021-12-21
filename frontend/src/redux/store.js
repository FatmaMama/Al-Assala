import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/userReducers';

const reducers = combineReducers({
    auth: authReducer
});

let initialState = {

};

const middleWare = [thunk];

const store = createStore(reducers,
                        initialState,
                        composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
