import { purgeStoredState } from 'redux-persist';
import persistConfig from '../persistConfig';

/**
 * Handle some redux-persist actions through a middleware.
 */
const persistMiddleware = () => next => async action => {
  if (action.type === 'PURGE') {
    await purgeStoredState(persistConfig);
  }

  next(action);
};

export default persistMiddleware;
