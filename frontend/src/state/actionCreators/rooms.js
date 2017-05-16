import request from 'axios';
import { BASE } from '../../config/config';
import { CREATE_ROOM, CREATE_ROOM_RESPONSE, CREATE_ROOM_ERR, FETCH_ROOMS } from '../actions/rooms';

export const fetchRooms = () => ({
  type: FETCH_ROOMS,
  api: {
    url: BASE + '/rooms',
    method: 'GET'
  }
});

export const createRoom = (name, topic) => {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_ROOM,
      payload: {
        name, topic
      }
    });

    request({
      url: BASE + '/room',
      method: 'POST',
      data: {
        name, topic
      },
      headers: {
        Authorization: getState().auth.token
      }
    }).then(() => {
      dispatch({
        type: CREATE_ROOM_RESPONSE
      });
      dispatch(fetchRooms());
    }).catch((err) => {
      dispatch({
        type: CREATE_ROOM_ERR,
        payload: err
      });
    });
  };
};
