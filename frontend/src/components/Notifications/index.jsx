import { connect } from 'react-redux';
import Notifications from './Notifications';
import { dismissNotification } from '../../state/actionCreators/notifications';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = {
  dismissNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
