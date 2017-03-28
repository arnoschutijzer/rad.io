import { combineReducers } from 'redux';
import authReducer from './auth.js';

export default combineReducers({
  auth: authReducer
});
