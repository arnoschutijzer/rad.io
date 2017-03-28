import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import middleware from './middleware';
import reducers from './reducers';

export const store = createStore(
  reducers,
  applyMiddleware(createLogger(), middleware));
