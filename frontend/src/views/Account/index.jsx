import { connect } from 'react-redux';
import { logout } from 'state/actionCreators/auth';
import Account from './Account';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
