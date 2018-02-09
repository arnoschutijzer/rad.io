import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { apiMiddleware } from './middleware';
import { validateToken } from './actionCreators/auth';
import reducers from './reducers';

const middlewares = [
  apiMiddleware,
  thunk
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const enhancer = compose(
  applyMiddleware(
    ...middlewares
  ),
  persistState('auth', {
    key: 'rad.io-state-auth'
  })
);

export const store = createStore(
  reducers,
  enhancer
);

// We instantly validate the token.
store.dispatch(validateToken());