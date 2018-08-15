import thunkMiddleware from 'redux-thunk';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import persistMiddleware from './persistMiddleware';
import rehydrateMiddleware from './rehydrateMiddleware';

const createMiddlewares = history => [
  thunkMiddleware,
  persistMiddleware,
  rehydrateMiddleware,
  createRouterMiddleware(history),
];

export default createMiddlewares;
