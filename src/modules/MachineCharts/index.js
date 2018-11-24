import switchcase from 'utils/switchcase';
import { createSelector } from 'reselect';
import forEach from 'lodash/fp/forEach';
import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import reject from 'lodash/fp/reject';
import minBy from 'lodash/fp/minBy';
import maxBy from 'lodash/fp/maxBy';
import { fetchDataByDate } from 'modules/TemperatureData';
import moment from 'moment';

// Initial State
const initialState = {
  entries: [],
  isLoading: false,
  errorMessage: '',
  machineNames: null,
};

// Selectors
const getEntries = state => state.chartData.entries;
const isLoading = state => state.chartData.isLoading;
const getErrorMessage = state => state.chartData.errorMessage;
const getMachineNames = state => state.chartData.machineNames;

const getChartData = createSelector(getEntries, entries => {
  // {
  //   date: 2018-11-01T00:00:00-03:00, name: "Maquina A", temperature: 100,
  // }
  // {
  //   date: 2018-11-01T00:00:00-03:00, name: "Maquina B", temperature: 150,
  // }
  // {
  //  date: 2018-11-01T00:00:00-03:00,
  //  MaquinaA: 100,
  //  MaquinaB: 150,
  // }

  const temperatureMapByDate = {};
  forEach(entry => {
    // create map by date
    const date = moment(entry.date).format('DD/MM/YYYY');

    temperatureMapByDate[date] = {
      ...temperatureMapByDate[date],
      date,
      [entry.name]: entry.temperature,
    };
  })(entries);
  // TODO: use another method to convert hash to map
  return map(e => ({ ...e }))(temperatureMapByDate);
});

const getWhiteListNames = createSelector(getMachineNames, machineNames =>
  flow(
    reject(m => !m.checked),
    map(m => m.name),
  )(machineNames),
);

const getMinTemperature = createSelector(
  getEntries,
  entries => entries.length && minBy(e => e.temperature)(entries).temperature,
);

const getMaxTemperature = createSelector(
  getEntries,
  entries => entries.length && maxBy(e => e.temperature)(entries).temperature,
);

export const selectors = {
  getChartData,
  getMinTemperature,
  getMaxTemperature,
  getMachineNames,
  getWhiteListNames,
  isLoading,
  getErrorMessage,
};

// Actions
export const FETCH_DATA_START = 'leonidas/ChartData/FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'leonidas/ChartData/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'leonidas/ChartData/FETCH_DATA_FAILURE';
export const SET_MACHINE_NAMES = 'leonidas/ChartData/SET_MACHINE_NAMES';
export const CHECKBOX_MACHINE_NAME = 'leonidas/ChartData/CHECKBOX_MACHINE_NAME';

// Action creators
const fetchDataStart = () => ({
  type: FETCH_DATA_START,
});

const fetchDataSuccess = entries => ({
  type: FETCH_DATA_SUCCESS,
  payload: entries,
});

const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

const setMachineNames = whiteListMachineNames => ({
  type: SET_MACHINE_NAMES,
  payload: whiteListMachineNames,
});

export const checkboxMachineName = (name, value) => ({
  type: CHECKBOX_MACHINE_NAME,
  payload: { name, value },
});

// Thunks
export const createMachineNames = entries => async dispatch => {
  const machineNames = {};
  forEach(entry => {
    // create map by machine name
    const key = entry.name;
    machineNames[key] = {
      key,
      name: entry.name,
      checked: true,
    };
  })(entries);

  dispatch(setMachineNames(machineNames));
};

export const fetchData = (startDate, endDate) => async dispatch => {
  dispatch(fetchDataStart());

  try {
    const entries = await fetchDataByDate(startDate, endDate);
    if (entries.length > 1) {
      await dispatch(createMachineNames(entries));
      await dispatch(fetchDataSuccess(entries));
    } else {
      dispatch(fetchDataFailure('Need more than one entry'));
    }
  } catch (err) {
    console.log('Firebase error', err);
    dispatch(fetchDataFailure(err));
  }
};

export default (state = initialState, action) =>
  switchcase({
    // fetching all entries
    [FETCH_DATA_START]: () => ({
      ...state,
      isLoading: true,
      entries: [],
      machineNames: null,
      errorMessage: '',
    }),
    [FETCH_DATA_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      entries: action.payload,
    }),
    [FETCH_DATA_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    [SET_MACHINE_NAMES]: () => ({
      ...state,
      machineNames: action.payload,
    }),
    [CHECKBOX_MACHINE_NAME]: () => ({
      ...state,
      machineNames: {
        ...state.machineNames,
        [action.payload.name]: {
          ...state.machineNames[action.payload.name],
          checked: action.payload.value,
        },
      },
    }),
  })(state)(action.type);
