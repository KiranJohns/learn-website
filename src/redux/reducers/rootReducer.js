import {combineReducers} from 'redux';
import newsReducer from './newsReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
  newsDetails: newsReducer,
  cart: cartReducer,
  user: userReducer,
  blog: blogReducer
})

export default rootReducer;