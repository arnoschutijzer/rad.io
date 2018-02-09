import { connect } from 'react-redux';
import App from './App';
import { login } from 'state/actionCreators/auth';
import { fetchSystemStatus } from 'state/actionCreators/system';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    system: state.system
  };
};

const mapDispatchToProps = {
  fetchSystemStatus, login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
