import { connect } from 'react-redux';
import { login, register } from 'state/actionCreators/auth';
import { createNotification } from 'state/actionCreators/notifications';
import Auth from './Auth';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  login, register, createNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
