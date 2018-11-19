import map from 'lodash/fp/map';
import find from 'lodash/fp/find';
import reject from 'lodash/fp/reject';
import switchcase from 'utils/switchcase';
import { getMachineDataDB } from 'modules/Firebase/machineData';
import {
  createEntryDB,
  getDataDB,
  updateDataByIdDB,
  deleteDataByIdDB,
} from 'modules/Firebase/temperatureData';
import i18nConstants from './i18nConstants';

// Initial State
const initialState = {
  machineDataEntries: [],
  entries: [],
  isLoading: false,
  errorMessage: '',
};

// Selectors
const getMachineData = state => state.temperatureDate.machineDataEntries;
const getData = state => state.temperatureDate.entries;
const isLoading = state => state.temperatureDate.isLoading;
const getErrorMessage = state => state.temperatureDate.errorMessage;

export const selectors = {
  getMachineData,
  getData,
  isLoading,
  getErrorMessage,
};

// Actions
export const FETCH_ENTRIES_START = 'leonidas/TemperatureData/FETCH_ENTRIES_START';
export const FETCH_MACHINE_DATA_ENTRIES_SUCCESS =
  'leonidas/TemperatureData/FETCH_MACHINE_DATA_ENTRIES_SUCCESS';
export const FETCH_MACHINE_DATA_ENTRIES_FAILURE =
  'leonidas/TemperatureData/FETCH_MACHINE_DATA_ENTRIES_FAILURE';
export const FETCH_ENTRIES_SUCCESS = 'leonidas/TemperatureData/FETCH_ENTRIES_SUCCESS';
export const FETCH_ENTRIES_FAILURE = 'leonidas/TemperatureData/FETCH_ENTRIES_FAILURE';

export const ACTION_CREATE_START = 'leonidas/TemperatureData/ACTION_CREATE_START';
export const ACTION_CREATE_SUCCESS = 'leonidas/TemperatureData/ACTION_CREATE_SUCCESS';
export const ACTION_CREATE_FAILURE = 'leonidas/TemperatureData/ACTION_CREATE_FAILURE';

export const ACTION_UPDATE_START = 'leonidas/TemperatureData/ACTION_UPDATE_START';
export const ACTION_UPDATE_SUCCESS = 'leonidas/TemperatureData/ACTION_UPDATE_SUCCESS';
export const ACTION_UPDATE_FAILURE = 'leonidas/TemperatureData/ACTION_UPDATE_FAILURE';

export const ACTION_DELETE_START = 'leonidas/TemperatureData/ACTION_DELETE_START';
export const ACTION_DELETE_SUCCESS = 'leonidas/TemperatureData/ACTION_DELETE_SUCCESS';
export const ACTION_DELETE_FAILURE = 'leonidas/TemperatureData/ACTION_DELETE_FAILURE';

// Action creators
const fetchEntriesStart = () => ({
  type: FETCH_ENTRIES_START,
});

const fetchMachineDataEntriesSuccess = entries => ({
  type: FETCH_MACHINE_DATA_ENTRIES_SUCCESS,
  payload: entries,
});

const fetchMachineDataEntriesFailure = error => ({
  type: FETCH_MACHINE_DATA_ENTRIES_FAILURE,
  payload: error,
});

const fetchEntriesSuccess = entries => ({
  type: FETCH_ENTRIES_SUCCESS,
  payload: entries,
});

const fetchEntriesFailure = error => ({
  type: FETCH_ENTRIES_SUCCESS,
  payload: error,
});

const createEntryStart = () => ({
  type: ACTION_CREATE_START,
});

const createEntrySucess = entry => ({
  type: ACTION_CREATE_SUCCESS,
  payload: entry,
});

const createEntryFailure = error => ({
  type: ACTION_CREATE_FAILURE,
  payload: error,
});

const updateEntryStart = () => ({
  type: ACTION_UPDATE_START,
});

const updateEntrySucess = updatedEntry => ({
  type: ACTION_UPDATE_SUCCESS,
  payload: updatedEntry,
});

const updateEntryFailure = error => ({
  type: ACTION_UPDATE_FAILURE,
  payload: error,
});

const deleteEntryStart = () => ({
  type: ACTION_DELETE_START,
});

const deleteEntrySucess = id => ({
  type: ACTION_DELETE_SUCCESS,
  id,
});

const deleteEntryFailure = error => ({
  type: ACTION_DELETE_FAILURE,
  payload: error,
});

// Thunks
export const fetchData = () => async dispatch => {
  dispatch(fetchEntriesStart());

  try {
    const entries = await getMachineDataDB();
    dispatch(fetchMachineDataEntriesSuccess(entries));
    // TODO: order by name
  } catch (err) {
    console.log('Firebase error', err);
    dispatch(fetchMachineDataEntriesFailure(err || i18nConstants['Api.GenericError']));
    return;
  }

  try {
    const entries = await getDataDB();
    dispatch(fetchEntriesSuccess(entries));
    // TODO: order by date
  } catch (err) {
    console.log('Firebase error', err);
    dispatch(fetchEntriesFailure(err || i18nConstants['Api.GenericError']));
  }
};

export const createDataEntry = data => async dispatch => {
  const entry = data[0];
  dispatch(createEntryStart());

  try {
    const newEntry = await createEntryDB(entry);
    dispatch(createEntrySucess(newEntry));
  } catch (err) {
    console.log('Firebase error when updating temperature data', err);
    dispatch(createEntryFailure(err || i18nConstants['Api.GenericError']));
  }
};

export const updateDataById = data => async (dispatch, getState) => {
  const currentEntries = getData(getState());
  const foundEntry = find(entry => data[entry.id])(currentEntries);
  if (foundEntry === undefined || !data[foundEntry.id]) {
    return;
  }
  const updatedEntry = { ...data[foundEntry.id], id: foundEntry.id };

  dispatch(updateEntryStart());
  try {
    await updateDataByIdDB(updatedEntry);
    dispatch(updateEntrySucess(updatedEntry));
  } catch (err) {
    console.log('Firebase error when updating temperature data', err);
    dispatch(updateEntryFailure(err || i18nConstants['Api.GenericError']));
  }
};

export const deleteDataById = id => async dispatch => {
  dispatch(deleteEntryStart());
  try {
    await deleteDataByIdDB(id);
    dispatch(deleteEntrySucess(id));
  } catch (err) {
    console.log('Firebase error when updating temperature data', err);
    dispatch(deleteEntryFailure(err || i18nConstants['Api.GenericError']));
  }
};

export default (state = initialState, action) =>
  switchcase({
    // fetching all entries
    [FETCH_ENTRIES_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_MACHINE_DATA_ENTRIES_SUCCESS]: () => ({
      ...state,
      machineDataEntries: action.payload,
    }),
    [FETCH_MACHINE_DATA_ENTRIES_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    [FETCH_ENTRIES_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      entries: action.payload,
    }),
    [FETCH_ENTRIES_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    // creating new entry
    [ACTION_CREATE_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [ACTION_CREATE_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      entries: [action.payload, ...state.entries],
    }),
    [ACTION_CREATE_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    // updating some entry
    [ACTION_UPDATE_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [ACTION_UPDATE_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      // insert here
      entries: map(
        entry => (entry.id === action.payload.id ? { ...entry, ...action.payload } : entry),
      )(state.entries),
    }),
    [ACTION_UPDATE_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    // deleting an entry
    [ACTION_DELETE_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [ACTION_DELETE_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      entries: reject(entry => entry.id === action.id)(state.entries),
    }),
    [ACTION_DELETE_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
  })(state)(action.type);
