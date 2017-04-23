import { combineReducers } from 'redux';
import authReducer from './auth';
import messages from './messages';
import notificationsReducer from './notifications';

export default combineReducers({
  auth: authReducer,
  messages: messages,
  notifications: notificationsReducer
});
