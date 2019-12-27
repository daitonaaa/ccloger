import Immutable from 'immutable';

import { immutableize } from 'utils';
import * as actionTypes from 'constants/actionTypes';

const initialState = Immutable.fromJS({
  logger: [],
  callStatus: null,
  dialingOptions: {
    inc: '',
    mode: 'tel',
  },
});

const caller = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.VOX_IMPLANT_ADD_LOG:
      return state.update('logger', logs => logs.push(action.log));

    case actionTypes.VOX_IMPLANT_SET_DATA:
      return state.set([action.field], action.value);

    case actionTypes.VOX_IMPLANT_RESET_CALL:
      return state.merge({
        call: {},
        callStatus: null,
        dialingOptions: {
          inc: '',
          mode: 'tel',
        },
      })

    case actionTypes.VOX_IMPLANT_SET_DIALING:
      return state.setIn(['dialingOptions', [action.field]], action.value);

    default:
      return state;
  }
};


export default immutableize(caller);
