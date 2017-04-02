import { DISMISS_NOTIFICATION } from '../actions/notifications';
import { omit } from 'underscore';
const initialState = {};

export default (state = initialState, action) => {
  if (action.error) {
    const id = action.error.id;
    return Object.assign({}, state, {[id]: action.error});
  }

  if (action.type === DISMISS_NOTIFICATION) {
    const id = action.id;
    return omit(state, id);
  }

  return state;
};
