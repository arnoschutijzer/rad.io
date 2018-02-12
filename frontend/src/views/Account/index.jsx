import { connect } from 'react-redux';
import { selectAuth } from 'state/selectors/auth';
import { logout } from 'state/actionCreators/auth';
import Account from './Account';

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state)
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
