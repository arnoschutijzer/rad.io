import { connect } from 'react-redux';
import { fetchSpotify, logout } from 'state/actionCreators/auth';
import Account from './Account';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  fetchSpotify, logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
