import {
  RECEIVE_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE
} from '../actions/messages';
import uuid from 'uuid/v4';

export const receiveMessage = (content) => ({
  type: RECEIVE_CHAT_MESSAGE,
  message: {
    id: uuid(),
    content
  }
});

export const sendMessage = (content) => ({
  type: SEND_CHAT_MESSAGE,
  message: {
    id: uuid(),
    content
  }
});
