import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import createMiddlewares from './middlewares';

// eslint-disable-next-line no-undef, no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState, history) => {
  const middlewares = createMiddlewares(history);

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(store);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        // eslint-disable-next-line global-require
        store.replaceReducer(require('./rootReducer').default);
      });
    }
  }

  return { store, persistor };
};

export default configureStore;
