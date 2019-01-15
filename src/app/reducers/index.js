import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import global from './global';

export const reducers = {
  global,
};

const rootReducer = (browserHistory) => combineReducers({
  ...reducers,
  router: connectRouter(browserHistory),
});


export default rootReducer;