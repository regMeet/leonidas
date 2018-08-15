/* eslint-disable no-unused-vars */
import { REHYDRATE } from 'redux-persist/lib/constants';

/**
 * After the page is refreshed the following action is being called.
 * Some class might get its properties deleted.
 */
const rehydrateMiddleware = () => next => async action => {
  if (action.type === REHYDRATE && action.payload) {
    const authState = action.payload.auth;

    // set some attributes if needed.
  }

  next(action);
};

export default rehydrateMiddleware;
