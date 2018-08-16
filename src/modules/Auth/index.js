import { createSelector } from 'reselect';
import switchcase from 'utils/switchcase';

// Enums
export const roleEnum = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

// Initial State
const initialState = {
  user: null,
};

// Selectors
const getUser = state => state.auth.user;

const getRole = createSelector(getUser, user => user && user.role);

const getUserName = createSelector(getUser, user => user && user.name);

export const selectors = {
  getUser,
  getRole,
  getUserName,
};

// Actions
export const SAVE_USER = 'leonidas/Auth/SAVE_USER';
export const USER_LOGOUT = 'leonidas/Auth/USER_LOGOUT';

// Action creators
export const saveUser = user => ({
  type: SAVE_USER,
  user,
});

export const logoutUser = () => ({
  type: USER_LOGOUT,
});

// Thunks
export const logout = () => async dispatch => {
  dispatch({ type: 'PURGE' });
  dispatch(logoutUser());
  // Remove cookies or storage
};

export default (state = initialState, action) =>
  switchcase({
    [SAVE_USER]: () => ({
      ...state,
      user: action.user,
    }),
  })(state)(action.type);
