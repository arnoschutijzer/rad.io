import { connect } from 'react-redux';
import { login, register } from '../../state/actionCreators/auth';
import Auth from './Auth';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  login, register
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
