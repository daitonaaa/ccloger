import Immutable from 'immutable';

import { immutableize } from 'utils';
import * as actionTypes from 'constants/actionTypes';

const initialState = Immutable.fromJS({
  init: false,
  tokens: {},
  error: null,
  indicators: {
    name: '',
    text: '',
  },
  userData: {
    displayName: '',
  }
});

const callsVoxImplant = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_VOX_USER_DATA:
      return state.setIn(['userData', [action.field]], action.value);

    case actionTypes.SET_VOX_DATA:
      return state.set([action.field], action.value);

    default:
      return state;
  }
};


export default immutableize(callsVoxImplant);
