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

export const receiveMessage = (content) => {
  if (!content._id) {
    content._id = uuid();
  }
  
  return {
    type: RECEIVE_CHAT_MESSAGE,
    content
  };
};

export const sendMessage = (content) => {
  content._id = uuid();
  return {
    type: SEND_CHAT_MESSAGE,
    message: content
  };
};
