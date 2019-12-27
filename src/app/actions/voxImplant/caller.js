import * as actionTypes from 'constants/actionTypes';


export const setDialing = (field, value) => ({
  type: actionTypes.VOX_IMPLANT_SET_DIALING,
  field, value,
});


const resetCall = () => ({
  type: actionTypes.VOX_IMPLANT_RESET_CALL
});


const addLog = (log) => ({
  type: actionTypes.VOX_IMPLANT_ADD_LOG,
  log,
});


const setData = (field, value) => ({
  type: actionTypes.VOX_IMPLANT_SET_DATA,
  field, value,
});


const closeCall = (call) => (dispatch) => {
  dispatch(voxImplantResetCall());
  call.hangup();
};


const createCall = () => (dispatch, getState) => {
  const voximplant = VoxImplant.getInstance();

  const { dialingOptions: { inc, mode } } = getState().voxImplant.caller;

  const customData = `mode=${mode}&inc=${inc}`;
  const call = voximplant.call(inc, false, customData);

  dispatch(addLog(new Log('TRUST', `Открыта сессия: ${call.id()}`)));
  dispatch(addLog(new Log('NOTIF', `Инициализация вызова | inc: ${inc}, callMode: ${mode}`)));
  return call;
}


export const voxImplantCall = () => (dispatch) => {
  const call = dispatch(createCall());
  dispatch(setData('callStatus', 'CONNECTING'));

  call.addEventListener(VoxImplant.CallEvents.Connected, (e) => {
    console.log('Connected', e);
    dispatch(setData('callStatus', 'CONNECTED'));
    dispatch(addLog(new Log('TRUST', 'Соединение установлено')));
  });

  call.addEventListener(VoxImplant.CallEvents.Disconnected, (e) => {
    console.log('Disconnected', e);
    dispatch(addLog(new Log('NOTIF', 'Вызов завершён')));
    dispatch(closeCall(e.call));
  });

  call.addEventListener(VoxImplant.CallEvents.Failed, (e) => {
    console.log('Failed', e);
    dispatch(addLog(new Log('ERROR', `Соединение прервано кодом ${e.name}:${e.code}`)));
    dispatch(closeCall(e.call));
  });

  call.addEventListener(VoxImplant.CallEvents.ProgressToneStart, e => {
    console.log('ProgressToneStart', e);
  });

  call.addEventListener(VoxImplant.CallEvents.ProgressToneStop, e => {
    console.log('ProgressToneStop', e);
  });
};


export const voxImplantResetCall = () => (dispatch) => {
  const voximplant = VoxImplant.getInstance();
	console.log("​voxImplantResetCall -> voximplant", voximplant)
  dispatch(resetCall());
};


// helpers 
function Log(type, text) {
  this.type = type;
  this.text = text;
};
