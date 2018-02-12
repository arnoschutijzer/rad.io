import { connect } from 'react-redux';
import App from './App';
import { selectAuth } from 'state/selectors/auth';
import { selectSystem } from 'state/selectors/system';
import { login } from 'state/actionCreators/auth';
import { fetchSystemStatus } from 'state/actionCreators/system';

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
    system: selectSystem(state)
  };
};

const mapDispatchToProps = {
  fetchSystemStatus, login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
