import Immutable from 'immutable';

import { immutableize } from 'utils';
import * as actionTypes from 'constants/actionTypes';

const initialState = Immutable.fromJS({
  global: true,
});

const global = (state = initialState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};


export default immutableize(global);
