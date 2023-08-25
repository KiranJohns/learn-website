import {combineReducers} from 'redux';
import newsReducer from './newsReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  newsDetails: newsReducer,
  cart: cartReducer,
})

export default rootReducer;