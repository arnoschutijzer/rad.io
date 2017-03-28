import { connect } from 'react-redux';
import App from './App';
import { login } from '../../state/actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
