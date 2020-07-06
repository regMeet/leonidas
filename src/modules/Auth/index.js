import { createSelector } from 'reselect';
import switchcase from 'utils/switchcase';
import { loginWithGoogle, logoutDB } from 'modules/Firebase/auth';
import { getUserDB, createUserDB, getRoleDB } from 'modules/Firebase/users';

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
export const login = () => async dispatch => {
  const user = await loginWithGoogle();

  if (user !== null) {
    // look user into database
    let userFound = await getUserDB(user.email);
    if (!userFound) {
      userFound = await createUserDB(user);
    }

    if (userFound) {
      userFound.photoURL = user.photoURL;
      userFound.role = await getRoleDB(user.email);
      // store user in the reducer
      dispatch(saveUser(userFound));
    }
    // TODO: Else, there was an error trying to log in, try again later.
  }
};

export const logout = () => async dispatch => {
  dispatch({ type: 'PURGE' });
  dispatch(logoutUser());
  logoutDB();
  // Remove cookies or storage
};

export default (state = initialState, action) =>
  switchcase({
    [SAVE_USER]: () => ({
      ...state,
      user: action.user,
    }),
  })(state)(action.type);
