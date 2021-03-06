import {
  FETCH_SYSTEM_STATUS_REQUEST,
  FETCH_SYSTEM_STATUS_RESPONSE,
  FETCH_SYSTEM_STATUS_ERROR
} from 'state/actions/system';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  if (action.type === FETCH_SYSTEM_STATUS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  if (action.type === FETCH_SYSTEM_STATUS_RESPONSE) {
    return Object.assign({}, state, {
      loading: false,
      online: true
    });
  }
  if (action.type === FETCH_SYSTEM_STATUS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      online: false
    });
  }

  return state;
};