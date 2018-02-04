import {
  LOGIN, LOGOUT,
  REGISTER_REQUEST, REGISTER_RESPONSE, REGISTER_ERROR,
  FETCH_PROFILE,
} from '../actions/auth';
import { createNotification } from './notifications';
import { BASE, CLIENT_ID } from '../../config/config';
import request from 'axios';

// We can't really use apiMiddleware here, since we want to chain actions.
export const register = (username, password) => {
  return (dispatch) => {
    dispatch(registerRequest());
    request({
      url: BASE + '/register',
      method: 'POST',
      data: {
        username, password
      }
    }).then((res) => {
      dispatch(registerResponse(res.response));
      dispatch(login(username, password));
    }).catch((error) => {
      dispatch(registerError(error.response.data));
      dispatch(createNotification('error', error.response.data));
    });
  };
};

export const login = (username, password) => ({
  type: LOGIN,
  api: {
    url: BASE + '/login',
    method: 'POST',
    data: {
      username,
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

// Spotify authorization flow
// TODO(arno):
// this shouldn't be a redux call, we just redirect the user to spotify auth flow.
// What we want to do here is:
// - redirect to backend/auth/spotify so we don't need the scopes, client_id, ... in the frontend
// - redirect back to the frontend after auth flow is completed
// - save the credentials.
export const fetchSpotify = () => {
  return (dispatch) => {
    request({
      url: 'https://accounts.spotify.com/authorize',
      method: 'GET',
      params: {
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: 'http://localhost:8080/spotify',
        scopes: 'user-read-private user-read-email'
      }
    }).then((response) => {
      // dispatch(response);
    });
  };
};
