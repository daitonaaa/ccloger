import Immutable from 'immutable';

import { immutableize } from 'utils';
import * as actionTypes from 'constants/actionTypes';

const initialState = Immutable.fromJS({
  appLoadingStatus: false,
});

const global = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_APP_LOADING_STATUS:
      return state.set('appLoadingStatus', action.status);

    default:
      return state;
  }
};


export default immutableize(global);
