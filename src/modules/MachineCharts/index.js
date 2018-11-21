import switchcase from 'utils/switchcase';
import { createSelector } from 'reselect';
import flow from 'lodash/fp/flow';
import forEach from 'lodash/fp/forEach';
import mapFp from 'lodash/fp/map';
import map from 'lodash/map';
import uniqByFp from 'lodash/fp/uniqBy';
import minBy from 'lodash/fp/minBy';
import maxBy from 'lodash/fp/maxBy';
import { fetchDataByDate } from 'modules/TemperatureData';
import moment from 'moment';

// Initial State
const initialState = {
  entries: [],
  isLoading: false,
  errorMessage: '',
};

// Selectors
const getEntries = state => state.chartData.entries;
const isLoading = state => state.chartData.isLoading;
const getErrorMessage = state => state.chartData.errorMessage;

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
      [entry.name]: entry.temperature, // .replace(/\s/g, '')
    };
  })(entries);

  // it doesn't work
  // forEach((key, entry) => {
  //   console.log('new key', key);
  //   console.log('new entry', entry);
  // })(temperatureMapByDate);

  const chartData = map(temperatureMapByDate, (entry, key) => ({ ...entry, date: key }));
  return chartData;
});

const getMachineNames = createSelector(getEntries, entries =>
  flow(
    mapFp(e => e.name), // .replace(/\s/g, '')
    uniqByFp(e => e),
  )(entries),
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
  getMachineNames,
  getMinTemperature,
  getMaxTemperature,
  isLoading,
  getErrorMessage,
};

// Actions
export const FETCH_DATA_START = 'leonidas/ChartData/FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'leonidas/ChartData/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'leonidas/ChartData/FETCH_DATA_FAILURE';

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

// Thunks
export const fetchData = (startDate, endDate) => async dispatch => {
  dispatch(fetchDataStart());

  try {
    const entries = await fetchDataByDate(startDate, endDate);
    if (entries.length > 1) {
      dispatch(fetchDataSuccess(entries));
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
  })(state)(action.type);
