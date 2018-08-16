import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectors } from 'modules/Auth';
import Login from 'pages/Login';

const withAuth = WrappedComponent => {
  class Authentication extends PureComponent {
    static propTypes = {
      user: PropTypes.object,
    };

    static defaultProps = {
      user: null,
    };

    render() {
      const { user } = this.props;
      if (user) {
        return <WrappedComponent {...this.props} />;
      }
      return <Login error />;
    }
  }

  const mapStateToProps = state => ({
    user: selectors.getUser(state),
  });

  return connect(mapStateToProps)(Authentication);
};

export default withAuth;
