import { connect } from 'react-redux';
import {
  sendMessage,
  receiveMessage,
  fetchChatlog
} from 'state/actionCreators/messages';
import { createNotification } from 'state/actionCreators/notifications';
import Broadcast from './Broadcast';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  createNotification, fetchChatlog, receiveMessage, sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Broadcast);
