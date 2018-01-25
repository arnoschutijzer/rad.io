import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.scss';

import { store } from './state';
import { App } from './views';

import { version } from '../package.json';
/* eslint-disable no-console */
console.log(`Running RAD.IO version ${version}`);
/* eslint-enable no-console */

ReactDOM.render(
  <Provider store={ store }>
    <App>
    </App>
  </Provider>,
  document.getElementById('app')
);
