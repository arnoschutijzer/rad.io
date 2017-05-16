import { connect } from 'react-redux';
import {
  createRoom,
  fetchRooms
} from 'state/actionCreators/rooms';
import Browse from './Browse';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  createRoom, fetchRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
