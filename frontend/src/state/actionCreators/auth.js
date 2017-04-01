import {
  LOGIN, LOGOUT,
  FETCH_PROFILE
} from '../actions/auth';
import { BASE } from '../../config/config';

export const login = (email, password) => ({
  type: LOGIN,
  api: {
    url: BASE + '/login',
    method: 'POST',
    data: {
      email,
      password
    }
  }
});

export const logout = () => ({
  type: LOGOUT
});

export const validateToken = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    if (token) {
      dispatch(fetchProfile(token));
    }
  };
};

export const fetchProfile = (token) => ({
  type: FETCH_PROFILE,
  // This token will be used if the API call succeeds and it doesn't return a token.
  // If the call does return a token, we'll use that in the reducer instead.
  token,
  api: {
    url: BASE + '/profile',
    method: 'GET',
    headers: {
      Authorization: token
    }
  }
});
