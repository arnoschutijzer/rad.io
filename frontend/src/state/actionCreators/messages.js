import {
  FETCH_CHATLOG,
  RECEIVE_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE
} from '../actions/messages';
import { BASE } from '../../config/config';
import uuid from 'uuid/v4';
import notificationSound from '../../assets/sounds/msg.mp3';

export const fetchChatlog = (roomId) => {
  if (!roomId) {
    throw new Error('no roomId specified');
  }
  return {
    type: FETCH_CHATLOG,
    api: {
      url: BASE + '/chatlog/' + roomId,
      method: 'GET'
    }
  };
};

export const receiveMessage = (content) => {
  if (!content._id) {
    content._id = uuid();
  }

  return (dispatch, getState) => {
    const user = getState().auth.user || {};

    // We only want to play a notification sound when the message we receive
    // isn't coming from the current user logged in or if shouldNotify is false.
    if (user._id !== content.author._id && content.shouldNotify) {
      const sound = new Audio(notificationSound);
      sound.play();
    }

    dispatch({
      type: RECEIVE_CHAT_MESSAGE,
      content
    });
  };
};

export const sendMessage = (content) => {
  content._id = uuid();

  return {
    type: SEND_CHAT_MESSAGE,
    message: content
  };
};
