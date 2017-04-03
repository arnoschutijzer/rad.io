import {
  DISMISS_NOTIFICATION,
  CREATE_NOTIFICATION
} from '../actions/notifications';
import uuid from 'uuid/v4';

export const dismissNotification = (id) => ({
  type: DISMISS_NOTIFICATION,
  id: id
});
export const createNotification = (type, response) => {
  return (dispatch, getState) => {
    const payload = {
      type: CREATE_NOTIFICATION,
      notification: {
        id: uuid(),
        type,
        response
      }
    };
    dispatch(payload);

    // Automatically dismiss after 5 seconds...
    setTimeout(() => {
      dispatch(dismissNotification(payload.notification.id));
    }, 5000);
  };
};
