import switchcase from 'utils/switchcase';

// Initial State
const initialState = {
  data: [],
  isLoading: false,
  errorMessage: '',
};

// Selectors
const getChartData = state => state.chartData.data;
const isLoading = state => state.chartData.isLoading;
const getErrorMessage = state => state.chartData.errorMessage;

export const selectors = {
  getChartData,
  isLoading,
  getErrorMessage,
};

// Actions
export const FETCH_DATA_START = 'leonidas/ChartData/FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'leonidas/ChartData/FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'leonidas/ChartData/FETCH_DATA_FAILURE';

export default (state = initialState, action) =>
  switchcase({
    // fetching all entries
    [FETCH_DATA_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_DATA_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    [FETCH_DATA_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
  })(state)(action.type);
