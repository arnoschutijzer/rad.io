import {
  FETCH_ROOM_RESPONSE,
  FETCH_ROOMS_RESPONSE
} from '../actions/rooms';

const initialState = {};

export default (state = initialState, action) => {
  if (action.type === FETCH_ROOMS_RESPONSE) {
    return mapRoomsToObject(action.payload);
  }
  if (action.type === FETCH_ROOM_RESPONSE) {
    const mappedRoom = {
      [action.payload._id]: action.payload
    };

    return Object.assign({}, state, mappedRoom);
  }

  return state;
};

const mapRoomsToObject = (array) => {
  const mapped = {};
  array.forEach((room) => {
    mapped[room._id] = room;
  });

  return mapped;
};