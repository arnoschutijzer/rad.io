import { connect } from 'react-redux';
import {
  sendMessage,
  receiveMessage,
  fetchChatlog
} from 'state/actionCreators/messages';
import { createNotification } from 'state/actionCreators/notifications';
import { selectAuth } from 'state/selectors/auth';
import { selectMessages } from 'state/selectors/messages';
import Broadcast from './Broadcast';

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
    messages: selectMessages(state)
  };
};

const mapDispatchToProps = {
  createNotification, fetchChatlog, receiveMessage, sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Broadcast);
