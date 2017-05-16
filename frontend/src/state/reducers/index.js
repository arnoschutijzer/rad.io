import { combineReducers } from 'redux';
import authReducer from './auth';
import messagesReducer from './messages';
import notificationsReducer from './notifications';
import roomsReducer from './rooms';

export default combineReducers({
  auth: authReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  rooms: roomsReducer
});
