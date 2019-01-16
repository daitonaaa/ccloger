import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import global from './global';
import callsVoxImplant from './callsVoxImplant';

export const reducers = {
  global,
  callsVoxImplant,
};

const rootReducer = (browserHistory) => combineReducers({
  ...reducers,
  router: connectRouter(browserHistory),
});


export default rootReducer;