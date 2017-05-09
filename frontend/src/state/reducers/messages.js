import {
  RECEIVE_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE,
  RECEIVE_CHATLOG
} from '../actions/messages';
import { LOGOUT } from '../actions/auth';

export default (state = [], action) => {
  if (action.type === RECEIVE_CHAT_MESSAGE ||
      action.type === SEND_CHAT_MESSAGE) {
    let newMessage = [ action.message ];
    return state.concat(newMessage);
  }

  if (action.type === LOGOUT) {
    return [];
  }

  if (action.type === RECEIVE_CHATLOG) {
    return action.payload.map((msg) => {
      msg.isOld = true;
      return msg;
    });
  }

  return state;
};
