import {
  FETCH_CHATLOG,
  RECEIVE_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE
} from '../actions/messages';
import { BASE } from '../../config/config';
import uuid from 'uuid/v4';

export const fetchChatlog = (roomId) => {
  if (!roomId) {
    throw new Error('no roomId specified');
  }
  return (dispatch, getState) => {
    return dispatch({
      type: FETCH_CHATLOG,
      api: {
        url: BASE + '/chatlog/' + roomId,
        method: 'GET',
        headers: {
          Authorization: getState().auth.token
        }
      }
    });
  };
};

export const receiveMessage = (content) => ({
  type: RECEIVE_CHAT_MESSAGE,
  message: {
    _id: uuid(),
    content
  }
});

export const sendMessage = (content) => ({
  type: SEND_CHAT_MESSAGE,
  message: {
    _id: uuid(),
    content
  }
});
