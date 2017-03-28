// TODO(arno): make state immutable
import { LOGIN, LOGIN_REQUEST, REGISTER_REQUEST } from '../constants/auth';

const initialState = {
  auth: false
};

export default (state = initialState, action) => {
  if (action.type === LOGIN) {
    return Object.assign({}, state, {auth: true});
  }

  if (action.type === LOGIN_REQUEST) {
    // do something
    return Object.assign({}, state, {auth: true});
  }

  if (action.type === REGISTER_REQUEST) {
    // do something
  }

  return state;
};
