import {
  LOGIN, LOGOUT,
  REGISTER_REQUEST, REGISTER_RESPONSE, REGISTER_ERROR,
  FETCH_PROFILE,
} from '../actions/auth';
import { BASE } from '../../config/config';
import uuid from 'uuid/v4';
import request from 'axios';

// We can't really use apiMiddleware here, since we want to chain actions.
export const register = (email, password) => {
  return (dispatch, getState) => {
    dispatch(registerRequest());
    request({
      url: BASE + '/register',
      method: 'POST',
      data: {
        email, password
      }
    }).then((res) => {
      dispatch(registerResponse(res.response));
      dispatch(login(email, password));
    }).catch((error) => {
      const payload = {
        id: uuid(),
        response: error.response.data
      };
      dispatch(registerError(payload));
    });
  };
};

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

/* Helper functions */
const registerRequest = () => ({
  type: REGISTER_REQUEST
});
const registerResponse = (response) => ({
  type: REGISTER_RESPONSE,
  payload: response
});
const registerError = (errorResponse) => ({
  type: REGISTER_ERROR,
  error: errorResponse
});
