import map from 'lodash/fp/map';
import find from 'lodash/fp/find';
import reject from 'lodash/fp/reject';
import switchcase from 'utils/switchcase';
import {
  createEntryDB,
  getMachineDataDB,
  updateMachineDataByIdDB,
  deleteMachineDataByIdDB,
} from 'modules/Firebase/machineData';
import i18nConstants from './i18nConstants';

// Initial State
const initialState = {
  entries: [],
  isLoading: false,
  isCreating: false, // TODO: show an spinner
  isUpdating: false, // TODO: show an spinner
  isDeleting: false, // TODO: show an spinner
  errorMessage: '',
};

// Selectors
const getMachineData = state => state.machineData.entries;
const isLoading = state => state.machineData.isLoading;
const isCreating = state => state.machineData.isCreating;
const isUpdating = state => state.machineData.isUpdating;
const isDeleting = state => state.machineData.isDeleting;
const getErrorMessage = state => state.machineData.errorMessage;

export const selectors = {
  getMachineData,
  isLoading,
  isCreating,
  isUpdating,
  isDeleting,
  getErrorMessage,
};

// Actions
export const FETCH_ENTRIES_START = 'leonidas/MachineData/FETCH_ENTRIES_START';
export const FETCH_ENTRIES_SUCCESS = 'leonidas/MachineData/FETCH_ENTRIES_SUCCESS';
export const FETCH_ENTRIES_FAILURE = 'leonidas/MachineData/FETCH_ENTRIES_FAILURE';

export const ACTION_CREATE_START = 'leonidas/MachineData/ACTION_CREATE_START';
export const ACTION_CREATE_SUCCESS = 'leonidas/MachineData/ACTION_CREATE_SUCCESS';
export const ACTION_CREATE_FAILURE = 'leonidas/MachineData/ACTION_CREATE_FAILURE';

export const ACTION_UPDATE_START = 'leonidas/MachineData/ACTION_UPDATE_START';
export const ACTION_UPDATE_SUCCESS = 'leonidas/MachineData/ACTION_UPDATE_SUCCESS';
export const ACTION_UPDATE_FAILURE = 'leonidas/MachineData/ACTION_UPDATE_FAILURE';

export const ACTION_DELETE_START = 'leonidas/MachineData/ACTION_DELETE_START';
export const ACTION_DELETE_SUCCESS = 'leonidas/MachineData/ACTION_DELETE_SUCCESS';
export const ACTION_DELETE_FAILURE = 'leonidas/MachineData/ACTION_DELETE_FAILURE';

// Action creators
const fetchEntriesStart = () => ({
  type: FETCH_ENTRIES_START,
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
export const fetchMachineData = () => async dispatch => {
  dispatch(fetchEntriesStart());

  try {
    const entries = await getMachineDataDB();
    dispatch(fetchEntriesSuccess(entries));
  } catch (err) {
    console.log('Firebase error', err);
    dispatch(fetchEntriesFailure(err || i18nConstants['Api.GenericError']));
  }
};

export const createMachineDataEntry = data => async dispatch => {
  const entry = data[0];
  dispatch(createEntryStart());

  try {
    const newEntry = await createEntryDB(entry);
    dispatch(createEntrySucess(newEntry));
  } catch (err) {
    console.log('Firebase error when updating machine data', err);
    dispatch(createEntryFailure(err || i18nConstants['Api.GenericError']));
  }
};

export const updateMachineDataById = data => async (dispatch, getState) => {
  const currentEntries = getMachineData(getState());
  const foundEntry = find(entry => data[entry.id])(currentEntries);
  if (foundEntry === undefined || !data[foundEntry.id]) {
    return;
  }
  const updatedEntry = { ...data[foundEntry.id], id: foundEntry.id };

  dispatch(updateEntryStart());
  try {
    await updateMachineDataByIdDB(updatedEntry);
    dispatch(updateEntrySucess(updatedEntry));
  } catch (err) {
    console.log('Firebase error when updating machine data', err);
    dispatch(updateEntryFailure(err || i18nConstants['Api.GenericError']));
  }
};

export const deleteMachineDataById = id => async dispatch => {
  dispatch(deleteEntryStart());
  try {
    await deleteMachineDataByIdDB(id);
    dispatch(deleteEntrySucess(id));
  } catch (err) {
    console.log('Firebase error when updating machine data', err);
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
    [FETCH_ENTRIES_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      entries: action.payload,
    }),
    [FETCH_ENTRIES_FAILURE]: () => ({
      ...state,
      isLoading: false,
      entries: [],
      errorMessage: action.payload,
    }),
    // creating new entry
    [ACTION_CREATE_START]: () => ({
      ...state,
      isCreating: true,
    }),
    [ACTION_CREATE_SUCCESS]: () => ({
      ...state,
      isCreating: false,
      entries: [action.payload, ...state.entries],
    }),
    [ACTION_CREATE_FAILURE]: () => ({
      ...state,
      isCreating: false,
      errorMessage: action.payload,
    }),
    // updating some entry
    [ACTION_UPDATE_START]: () => ({
      ...state,
      isDeleting: true,
    }),
    [ACTION_UPDATE_SUCCESS]: () => ({
      ...state,
      isDeleting: false,
      // insert here
      entries: map(
        entry => (entry.id === action.payload.id ? { ...entry, ...action.payload } : entry),
      )(state.entries),
    }),
    [ACTION_UPDATE_FAILURE]: () => ({
      ...state,
      isDeleting: false,
      errorMessage: action.payload,
    }),
    // deleting an entry
    [ACTION_DELETE_START]: () => ({
      ...state,
      isDeleting: true,
    }),
    [ACTION_DELETE_SUCCESS]: () => ({
      ...state,
      isDeleting: false,
      entries: reject(entry => entry.id === action.id)(state.entries),
    }),
    [ACTION_DELETE_FAILURE]: () => ({
      ...state,
      isDeleting: false,
      errorMessage: action.payload,
    }),
  })(state)(action.type);
