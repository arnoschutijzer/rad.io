import { BASE } from '../../config/config';
import { CREATE_ROOM, FETCH_ROOMS } from '../actions/rooms';

export const fetchRooms = () => ({
  type: FETCH_ROOMS,
  api: {
    url: BASE + '/rooms',
    method: 'GET'
  }
});

export const createRoom = (name, topic) => {
  return {
    type: CREATE_ROOM,
    api: {
      url: `${BASE}/room`,
      method: 'POST',
      data: { name, topic }
    }
  };
};
