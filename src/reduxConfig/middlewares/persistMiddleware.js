import { persistStore, purgeStoredState } from 'redux-persist';
import persistConfig from '../persistConfig';

/**
 * Handle some redux-persist actions through a middleware.
 */
const persistMiddleware = store => next => async action => {
  // This action is being called in AUTH module
  if (action.type === 'PURGE') {
    await purgeStoredState(persistConfig);
    persistStore(store);
  }

  next(action);
};

export default persistMiddleware;
