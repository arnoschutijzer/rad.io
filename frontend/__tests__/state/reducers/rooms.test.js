import {
  FETCH_ROOMS_RESPONSE
} from 'state/actions/rooms';
import reduceRooms from 'state/reducers/rooms';

describe('reducers/rooms', () => {
  test('should return initial state', () => {
    const state = reduceRooms(undefined, {});
    expect(state).toEqual({});
  });

  test('should map rooms by id', () => {
    const firstRoom = {
      _id: 'first',
      name: 'first room'
    };
    const secondRoom = {
      _id: 'second',
      name: 'second room'
    };
    const rooms = [ firstRoom, secondRoom ];
    const state = reduceRooms(undefined, {
      type: FETCH_ROOMS_RESPONSE,
      payload: rooms
    });
    expect(state).toEqual({
      [ firstRoom._id ]: firstRoom,
      [ secondRoom._id ]: secondRoom
    });
  });
});