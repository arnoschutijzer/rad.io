// Kudos to A.B. for this code. :+1:
import { isObject } from 'underscore';
import request from 'axios';
import uuid from 'uuid/v4';
import { UNAUTHORIZED } from '../actions/auth';

const apiMiddleware = store => next => action => {
  if (!isObject(action.api)) {
    return next(action);
  }

  dispatch('REQUEST', {request: action.api});
  return request(action.api)
    .then(response => {
      dispatch('RESPONSE', {payload: response.data});
    }).catch(error => {
      if (error.response && error.response.status === 401 || !error.response) {
        dispatchUnauthorized();
      } else {
        const payload = {
          id: uuid(),
          response: error.response.data
        };
        dispatch('ERROR', {error: payload});
      }
    });

  function dispatch(subtype = '', opts = {}) {
    const type = action.type || 'API_CALL';

    store.dispatch(Object.assign({}, action, {
      type: `${type}/${subtype}`,
      api: null
    }, opts));
  }

  function dispatchUnauthorized() {
    store.dispatch({
      type: UNAUTHORIZED
    });
  }
};

export default apiMiddleware;
