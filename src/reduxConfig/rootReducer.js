import { persistCombineReducers } from 'redux-persist';
import auth, { USER_LOGOUT } from 'modules/Auth';
import users from 'modules/Users';
import machineData from 'modules/MachineData';
import temperatureDate from 'modules/TemperatureData';
import chartData from 'modules/MachineCharts';
import persistConfig from './persistConfig';

const reducers = {
  auth,
  users,
  machineData,
  temperatureDate,
  chartData,
};

const appReducer = persistCombineReducers(persistConfig, reducers);

const rootReducer = (state, action) =>
  appReducer(action.type === USER_LOGOUT ? undefined : state, action);

export default rootReducer;
