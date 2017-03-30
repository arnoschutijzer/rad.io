import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from './middleware';
import { hydrateAuthState } from './actionCreators/auth';
import reducers from './reducers';

const token = localStorage.getItem('rad.io-token');

export const store = createStore(
  reducers,
  {auth: {token}},
  applyMiddleware(createLogger(), apiMiddleware));

store.dispatch(hydrateAuthState(token));
