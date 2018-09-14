import {
  RECEIVE_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE,
  FETCH_CHATLOG_RESPONSE
} from '../actions/messages';
import { LOGOUT } from '../actions/auth';

const initialState = {
  loading: false,
  messages: []
};

export default (state = initialState, action) => {
  if (action.type === RECEIVE_CHAT_MESSAGE ||
      action.type === SEND_CHAT_MESSAGE) {
    let newMessage = [ action.content ];
    const newMessages = state.messages.concat(newMessage);
    return Object.assign({}, state, { messages: newMessages });
  }

  if (action.type === LOGOUT) {
    return initialState;
  }

  if (action.type === FETCH_CHATLOG_RESPONSE) {
    return Object.assign({}, initialState, { messages: action.payload });
  }

  return state;
};
