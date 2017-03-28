// Kudos to A.B. for this code. :+1:
import { isObject } from 'underscore';

// TODO(arno): use a different library than native fetch API, it's not as great as it looks
// Error handling can be done a lot better
const apiMiddleware = store => next => action => {
  if (!isObject(action.api)) {
    return next(action);
  }

  dispatch('REQUEST', {request: action.api});
  return fetch(action.api.url, action.api.options)
    .then(response => {
      // Check if the response is ok, fetch won't reject in case of 4xx/5xx
      if (response.ok) {
        response.json().then(res => {
          dispatch('RESPONSE', {response: res});
        });
      } else {
        response.json().then(res => {
          dispatch('RESPONSE', {error: res});
        });
      }
    }).catch(error => {
      // Couldn't get a response from the backend...
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
