import { combineReducers } from 'redux';
import authReducer from './auth';
import notificationsReducer from './notifications';

export default combineReducers({
  auth: authReducer,
  notifications: notificationsReducer
});
