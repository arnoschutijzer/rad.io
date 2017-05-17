import {
  FETCH_ROOMS_RESPONSE
} from '../actions/rooms';

const initialState = {};

export default (state = initialState, action) => {
  if (action.type === FETCH_ROOMS_RESPONSE) {
    return mapRoomsToObject(action.payload);
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