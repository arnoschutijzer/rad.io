import { connect } from 'react-redux';
import {
  sendMessage,
  receiveMessage
} from 'state/actionCreators/messages';
import { createNotification } from 'state/actionCreators/notifications';
import Broadcast from './Broadcast';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  receiveMessage, sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Broadcast);
