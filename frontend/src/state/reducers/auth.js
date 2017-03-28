import {
  LOGIN_REQUEST, LOGIN_RESPONSE,
  REGISTER_REQUEST
} from '../constants/auth';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  if (action.type === LOGIN_REQUEST) {
    // do something
    return Object.assign({}, state, {loading: true});
  }

  if (action.type === LOGIN_RESPONSE) {
    const payload = action.payload;
    return Object.assign({}, state, {
      loading: false,
      user: payload.user,
      token: payload.token
    });
  }

  if (action.type === REGISTER_REQUEST) {
    // do something
  }

  return state;
};
