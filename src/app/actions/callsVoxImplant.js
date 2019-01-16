import VOX from 'constants/voxImplant';
import * as actionTypes from 'constants/actionTypes';


const voxSetData = (field, value) => ({
  type: actionTypes.SET_VOX_DATA,
  field, value,
});


const voxSetUserData = (field, value) => ({
  type: actionTypes.SET_VOX_USER_DATA,
  field, value,
});


export const voxImplantInit = () => (dispatch, getState) => {
    const voximplant = VoxImplant.getInstance();
    
    if (!voximplant._connected) {
      dispatch(voxSetData('indicators', { name: 'CONNECTING', text: 'Соединение...' }));
  
      voximplant.init();
    
      voximplant.addEventListener(VoxImplant.Events.SDKReady, ({ name }) => {
        dispatch(voxSetData('indicators', { name: 'CONNECTING', text: 'Соединение...' }));
        voximplant.connect();
      });
    
      voximplant.addEventListener(VoxImplant.Events.ConnectionEstablished, ({ name }) => {
        dispatch(voxSetData('indicators', { name: 'CONNECTING', text: 'Соединение...' }));
        voximplant.login(VOX.AUTH_INFO.USER, VOX.AUTH_INFO.PASSWORD);
      });
    
      voximplant.addEventListener(VoxImplant.Events.AuthResult, (event) => {
        if (event.result) {
          console.log(event)
          dispatch(voxSetData('init', false));
          dispatch(voxSetData('tokens', event.tokens));
          dispatch(voxSetData('indicators', { name: 'SUCCESS_CONNECT', text: '' }));
          dispatch(voxSetUserData('displayName', event.displayName))
        } else dispatch(voxSetData('error', event));
      });
    }
}
