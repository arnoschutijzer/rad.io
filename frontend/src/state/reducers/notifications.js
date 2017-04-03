import { DISMISS_NOTIFICATION } from '../actions/notifications';
import { omit } from 'underscore';
const initialState = {};

export default (state = initialState, action) => {
  if (action.notification && action.notification.type === 'error') {
    return Object.assign(
      {}, state, {[action.notification.id]: action.notification}
    );
  }

  if (action.notification && action.notification.type === 'info') {
    return Object.assign(
      {}, state, {[action.notification.id]: action.notification}
    );
  }

  if (action.type === DISMISS_NOTIFICATION) {
    const id = action.id;
    return omit(state, id);
  }

  return state;
};
