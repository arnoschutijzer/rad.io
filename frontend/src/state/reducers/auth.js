import {
  LOGIN_REQUEST, LOGIN_RESPONSE,
  REGISTER_REQUEST,
  CHECK_TOKEN_RESPONSE, CHECK_TOKEN_ERROR,
  UNAUTHORIZED
} from '../actions/auth';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  if (action.type === LOGIN_REQUEST) {
    // do something
    return Object.assign({}, state, {loading: true});
  }

  if (action.type === LOGIN_RESPONSE || action.type === CHECK_TOKEN_RESPONSE) {
    const token = action.payload.token || action.alwaysPass.token;
    const payload = action.payload;

    localStorage.setItem('rad.io-token', token);

    return Object.assign({}, state, {
      loading: false,
      user: payload.user,
      token: token
    });
  }

  if (action.type === REGISTER_REQUEST) {
    // do something
  }

  if (action.type === CHECK_TOKEN_ERROR || action.type === UNAUTHORIZED) {
    localStorage.setItem('rad.io-token', undefined);
    return initialState;
  }

  return state;
};
