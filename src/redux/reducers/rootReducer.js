import {combineReducers} from 'redux';
import newsReducer from './newsReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  newsDetails: newsReducer,
  cart: cartReducer,
  user: userReducer
})

export default rootReducer;