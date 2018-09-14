import { ERROR, RESPONSE } from '../utils';

export const FETCH_ROOMS = 'FETCH_ROOMS';
export const FETCH_ROOMS_RESPONSE = `${FETCH_ROOMS}/${RESPONSE}`;
export const FETCH_ROOMS_ERR = `${FETCH_ROOMS}/${ERROR}`;

export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_RESPONSE = `${CREATE_ROOM}/${RESPONSE}`;
export const CREATE_ROOM_ERR = `${CREATE_ROOM}/${ERROR}`;