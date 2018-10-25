import switchcase from 'utils/switchcase';
import { getEntriesDB } from 'modules/Firebase/machineData';
import i18nConstants from './i18nConstants';

// Initial State
const initialState = {
  entries: [],
  isLoading: false,
  errorMessage: '',
};

// Selectors
const getMachineData = state => state.machineData.entries;
const isLoading = state => state.machineData.isLoading;
const getErrorMessage = state => state.machineData.errorMessage;

export const selectors = {
  getMachineData,
  isLoading,
  getErrorMessage,
};

// Actions
export const FETCH_ENTRIES_START = 'leonidas/MachineData/FETCH_ENTRIES_START';
export const FETCH_ENTRIES_SUCCESS = 'leonidas/MachineData/FETCH_ENTRIES_SUCCESS';
export const FETCH_ENTRIES_FAILURE = 'leonidas/MachineData/FETCH_ENTRIES_FAILURE';

// Action creators
const fetchEntriesStart = () => ({
  type: FETCH_ENTRIES_START,
});

const fetchEntriesSuccess = entries => ({
  type: FETCH_ENTRIES_SUCCESS,
  payload: entries,
});

const fetchEntriesaFailure = error => ({
  type: FETCH_ENTRIES_SUCCESS,
  payload: error,
});

// Thunks
export const fetchMachineData = () => async dispatch => {
  dispatch(fetchEntriesStart());

  try {
    const entries = await getEntriesDB();
    dispatch(fetchEntriesSuccess(entries));
  } catch (err) {
    console.log('Firebase error', err);
    dispatch(fetchEntriesaFailure(err || i18nConstants['Api.GenericError']));
  }
};

export default (state = initialState, action) =>
  switchcase({
    [FETCH_ENTRIES_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_ENTRIES_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      machineData: action.payload,
    }),
    [FETCH_ENTRIES_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
  })(state)(action.type);
