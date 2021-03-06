import { ERROR, RESPONSE, REQUEST } from '../utils';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `${LOGIN}/${REQUEST}`;
export const LOGIN_RESPONSE = `${LOGIN}/${RESPONSE}`;
export const LOGOUT = 'LOGOUT';

export const REGISTER = 'REGISTER';
export const REGISTER_REQUEST = `${REGISTER}/${REQUEST}`;
export const REGISTER_RESPONSE = `${REGISTER}/${RESPONSE}`;
export const REGISTER_ERROR = `${REGISTER}/${ERROR}`;

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_PROFILE_REQUEST = `${FETCH_PROFILE}/${REQUEST}`;
export const FETCH_PROFILE_RESPONSE = `${FETCH_PROFILE}/${RESPONSE}`;
export const FETCH_PROFILE_ERROR = `${FETCH_PROFILE}/${ERROR}`;

export const UNAUTHORIZED = 'UNAUTHORIZED';
