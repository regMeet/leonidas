import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NavigationHeader from 'components/TopNavBar/containers';

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Home = ({ history }) => (
  <div>
    <NavigationHeader />
    <h1>Home</h1>
    <p>Welcome home!</p>

    <div>
      <button type="button" onClick={() => history.push('users')}>
        Go to users page via redux
      </button>
    </div>
  </div>
);

Home.displayName = 'Home';
Home.propTypes = propTypes;

export default withRouter(Home);
