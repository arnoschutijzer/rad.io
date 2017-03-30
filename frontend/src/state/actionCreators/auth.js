import {
  LOGIN,
  CHECK_TOKEN
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

export const hydrateAuthState = (token) => ({
  type: CHECK_TOKEN,
  alwaysPass: {
    token
  },
  api: {
    url: BASE + '/profile',
    method: 'GET',
    headers: {
      Authorization: token
    }
  }
});
