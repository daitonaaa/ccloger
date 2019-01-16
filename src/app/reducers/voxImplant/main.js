import Immutable from 'immutable';

import { immutableize } from 'utils';
import * as actionTypes from 'constants/actionTypes';

const initialState = Immutable.fromJS({
  state: '',
  userData: {
    tokens: {},
    displayName: '',
  }
});

const main = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.VOX_IMPLANT_SET_STATE:
      return state.set('state', action.state);

    case actionTypes.VOX_IMPLANT_SET_USER_DATA:
      return state.setIn(['userData', [action.field]], action.value);

    default:
      return state;
  }
};


export default immutableize(main);
