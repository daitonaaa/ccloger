import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import 'scss/common.scss';

import Root from './Root';
import configureStore from './configureStore';

const initialState = window.__INITIAL_STATE__ || {};
const browserHistory = createHistory();
const store = configureStore(initialState, browserHistory);


ReactDOM.hydrate(
  <AppContainer>
    <Root {...{ store, browserHistory }} />
  </AppContainer>,
  document.getElementById('logger-root')
);