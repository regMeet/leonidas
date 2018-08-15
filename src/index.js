import React from 'react';
import ReactNative from 'react-native';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './reduxConfig/configureStore';

const history = createHistory();

const { store, persistor } = configureStore(undefined, history);

const rootEl = document.getElementById('root');

const renderApp = () => {
  // eslint-disable-next-line global-require
  const RootAppComponent = require('./App').default;

  const ComponentInst = <RootAppComponent store={store} persistor={persistor} history={history} />;

  if (rootEl.hasChildNodes()) {
    ReactNative.hydrate(ComponentInst, rootEl);
  } else {
    ReactNative.render(ComponentInst, rootEl);
  }
};

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(renderApp);
  });
}

renderApp();

registerServiceWorker();
