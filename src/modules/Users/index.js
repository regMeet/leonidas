import switchcase from 'utils/switchcase';
import { getUsersDB } from 'modules/Firebase/users';
import i18nConstants from './i18nConstants';
// import { createSelector } from 'reselect';

// Initial State
const initialState = {
  users: [],
  isLoading: false,
  errorMessage: '',
};

// Selectors
const getUsers = state => state.users.users;
const isLoading = state => state.users.isLoading;
const getErrorMessage = state => state.users.errorMessage;

export const selectors = {
  getUsers,
  isLoading,
  getErrorMessage,
};

// Actions
export const FETCH_USERS_START = 'leonidas/Users/FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'leonidas/Users/FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'leonidas/Users/FETCH_USERS_FAILURE';
export const SAVE_USERS = 'leonidas/Users/SAVE_USERS';

// Action creators
const fetchUsersStart = () => ({
  type: FETCH_USERS_START,
});

const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = error => ({
  type: FETCH_USERS_SUCCESS,
  payload: error,
});

// Thunks
export const fetchUsers = () => async dispatch => {
  dispatch(fetchUsersStart());

  try {
    const users = await getUsersDB();
    dispatch(fetchUsersSuccess(users));
  } catch (err) {
    console.log('Firebase error', err);
    dispatch(fetchUsersFailure(err || i18nConstants['Api.GenericError']));
  }
};

export default (state = initialState, action) =>
  switchcase({
    [FETCH_USERS_START]: () => ({
      ...state,
      isLoading: true,
    }),
    [FETCH_USERS_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      users: action.payload,
    }),
    [FETCH_USERS_FAILURE]: () => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    [SAVE_USERS]: () => ({
      ...state,
      users: action.users,
    }),
  })(state)(action.type);
