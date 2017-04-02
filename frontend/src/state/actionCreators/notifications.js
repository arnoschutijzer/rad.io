import { DISMISS_NOTIFICATION } from '../actions/notifications';

export const dismissNotification = (id) => ({
  type: DISMISS_NOTIFICATION,
  id: id
});
