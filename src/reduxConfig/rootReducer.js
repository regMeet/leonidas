import { persistCombineReducers } from 'redux-persist';
import auth, { USER_LOGOUT } from 'modules/Auth';
import users from 'modules/Users';
import machineData from 'modules/MachineData';
import temperatureDate from 'modules/TemperatureData';
import persistConfig from './persistConfig';

const reducers = {
  auth,
  users,
  machineData,
  temperatureDate,
};

const appReducer = persistCombineReducers(persistConfig, reducers);

const rootReducer = (state, action) =>
  appReducer(action.type === USER_LOGOUT ? undefined : state, action);

export default rootReducer;
