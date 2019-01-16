import * as actionTypes from 'constants/actionTypes';


export const setAppLoadingStatus = (status) => ({
  type: actionTypes.SET_APP_LOADING_STATUS,
  status,
});
