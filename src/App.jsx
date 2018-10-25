import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Users from 'pages/Users';
import MachineData from 'pages/MachineData';
import NoMatch from 'pages/NoMatch';

import withRole from 'modules/Auth/hocs/withRole';

const AdminRole = withRole(['ADMIN']);
// const UserRole = withAuth(['USER'])

const propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const App = ({ store, persistor, history }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Helmet defaultTitle="Leonidas" titleTemplate="Leonidas - %s">
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/users" component={AdminRole(Users)} />
            <Route path="/machine-data" component={AdminRole(MachineData)} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

App.displayName = 'App';
App.propTypes = propTypes;

export default App;
