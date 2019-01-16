import VOX from 'constants/voxImplant';
import * as actionTypes from 'constants/actionTypes';


const setState = (state) => ({
  type: actionTypes.VOX_IMPLANT_SET_STATE,
  state,
});


const setUserData = (field, value) => ({
  type: actionTypes.VOX_IMPLANT_SET_USER_DATA,
  field, value,
});


export const clientDevicesAudit = () => (dispatch, getState) => {
  console.log(VoxImplant)
  const streamManager = new VoxImplant.Hardware.StreamManager.get();

  console.log(streamManager);
};


export const voxImplantInit = () => async (dispatch, getState) => {
  const voximplant = VoxImplant.getInstance();
  console.log("​voxImplantInit -> voximplant", voximplant)
  console.log("​voxImplantInit -> voximplant", voximplant.getClientState())
  
  if (!voximplant._connected) {
    voximplant.addEventListener(VoxImplant.Events.SDKReady, () => {
      dispatch(setState('CONNECTING'));
    });
  
    voximplant.addEventListener(VoxImplant.Events.ConnectionEstablished, () => {
      dispatch(setState('CONNECTING'));
    });

    voximplant.addEventListener(VoxImplant.Events.AuthResult, (event) => {
      if (event.result) {
        dispatch(setState('SUCCESS_CONNECT'));
        dispatch(setUserData('tokens', event.tokens));
        dispatch(setUserData('displayName', event.displayName))
      } else dispatch(setState('CONNECTINON_FAILED'));
    });

    dispatch(setState('CONNECTING'));

    try {
      await voximplant.init({
        // showDebugInfo: true,
        micRequired: true,
        progressToneCountry: 'RU',
      });
      
      await voximplant.connect(false);
      voximplant.login(VOX.AUTH_INFO.USER, VOX.AUTH_INFO.PASSWORD);
    } catch(e) {
      console.log("​catch -> e", e)
      dispatch(setState('CONNECTINON_FAILED'));
    }
  }
};
