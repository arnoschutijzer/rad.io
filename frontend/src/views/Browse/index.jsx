import { connect } from 'react-redux';
import {
  createRoom,
  fetchRooms
} from 'state/actionCreators/rooms';
import { createNotification } from 'state/actionCreators/notifications';
import { selectRooms } from 'state/selectors/rooms';
import Browse from './Browse';

const mapStateToProps = (state) => {
  return {
    rooms: selectRooms(state)
  };
};

const mapDispatchToProps = {
  createRoom, fetchRooms, createNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
