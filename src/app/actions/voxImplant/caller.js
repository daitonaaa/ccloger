import * as actionTypes from 'constants/actionTypes';


export const setDialing = (field, value) => ({
  type: actionTypes.VOX_IMPLANT_SET_DIALING,
  field, value,
});


const addLog = (log) => ({
  type: actionTypes.VOX_IMPLANT_ADD_LOG,
  log,
});


const setData = (field, value) => ({
  type: actionTypes.VOX_IMPLANT_SET_DATA,
  field, value,
});


export const voxImplantCall = () => (dispatch, getState) => {
  const voximplant = VoxImplant.getInstance();
  const messenger = VoxImplant.getMessenger();
  console.log("​voxImplantCall -> messenger", messenger);

  const { dialingOptions } = getState().voxImplant.caller;
  console.log("​voxImplantCall -> dialingOptions", dialingOptions);

  const call = voximplant.call(dialingOptions.inc, false);
  
  dispatch(setData('callStatus', 'CONNECTING'));

  dispatch(addLog(new Log('TRUST', `Вызов: ${call.id()}`)));
  dispatch(addLog(new Log('NOTIF', `Инициализация | inc: ${dialingOptions.inc}, callMode: ${dialingOptions.mode}`)));

  call.addEventListener(VoxImplant.CallEvents.Connected, (e) => {
    dispatch(addLog(new Log('NOTIF', 'Соединение...')));
    console.log(e);
  });

  call.addEventListener(VoxImplant.CallEvents.Disconnected, (e) => {
    dispatch(addLog(new Log('TRUST', 'Вызов завершён')));
    console.log('Disconnected', e);
    call.hangup();
  });

  call.addEventListener(VoxImplant.CallEvents.Failed, (e) => {
    dispatch(addLog(new Log('ERROR', `Соединение прервано кодом ${e.name}:${e.code}`)));
    console.log('Failed', e);
  });

  call.addEventListener(VoxImplant.CallEvents.ProgressToneStart, e => {
    console.log('ProgressToneStart', e);
  });

  call.addEventListener(VoxImplant.CallEvents.ProgressToneStop, e => {
    console.log('ProgressToneStop', e);
  });
}


// helpers 
function Log(type, text) {
  this.type = type;
  this.text = text;
};
