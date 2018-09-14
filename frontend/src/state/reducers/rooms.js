import {
  CREATE_ROOM_RESPONSE,
  FETCH_ROOMS_RESPONSE
} from '../actions/rooms';

const initialState = {
  loading: false,
  rooms: {}
};

export default (state = initialState, action) => {
  if (action.type === FETCH_ROOMS_RESPONSE) {
    const rooms = mapRoomsToObject(action.payload);
    return Object.assign({}, state, { rooms });
  }
  if (action.type === CREATE_ROOM_RESPONSE) {
    const rooms = mapRoomsToObject([ action.payload ]);
    return Object.assign({}, state, { rooms });
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