import { connect } from 'react-redux';
import {
  receiveSpotifyCredentials
} from 'state/actionCreators/auth';
import SpotifyConnection from './SpotifyConnection';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  receiveSpotifyCredentials
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyConnection);
