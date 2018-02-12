import { connect } from 'react-redux';
import Notifications from './Notifications';
import { selectNotifications } from 'state/selectors/notifications';
import { dismissNotification } from 'state/actionCreators/notifications';

const mapStateToProps = (state) => {
  return {
    notifications: selectNotifications(state)
  };
};

const mapDispatchToProps = {
  dismissNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
