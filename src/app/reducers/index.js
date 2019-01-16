import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import global from './global';
import voxImplant from './voxImplant';

export const reducers = {
  global,
  voxImplant,
};

const rootReducer = (browserHistory) => combineReducers({
  ...reducers,
  router: connectRouter(browserHistory),
});


export default rootReducer;