// Kudos to A.B. for this code. :+1:
import { isObject } from 'underscore';
import request from 'axios';

// TODO(arno): use a different library than native fetch API, it's not as great as it looks
// Error handling can be done a lot better
const apiMiddleware = store => next => action => {
  if (!isObject(action.api)) {
    return next(action);
  }

  dispatch('REQUEST', {request: action.api});
  request(action.api)
    .then(response => {
      dispatch('RESPONSE', {payload: response.data});
    }).catch(error => {
      dispatch('ERROR', {error: error.response.data});
    });

  function dispatch(subtype = '', opts = {}) {
    const type = action.type || 'API_CALL';

    store.dispatch(Object.assign({}, action, {
      type: `${type}/${subtype}`,
      api: null
    }, opts));
  }
};

export default apiMiddleware;
