import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors as AuthSelectors, login } from 'modules/Auth';
import NavigationHeader from 'modules/TopNavBar/containers';

class Login extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    error: PropTypes.bool,
    handleLogin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
    error: false,
  };

  componentDidMount() {
    const { history, user } = this.props;
    if (user) {
      history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { error, handleLogin } = this.props;

    return (
      <div>
        <NavigationHeader />

        <h1>Login</h1>
        {error && <p>You were not logged in</p>}
        <p>Welcome to the Login page!</p>

        <div>
          <button type="button" onClick={() => handleLogin('Google')}>
            Log in with Google
          </button>

          <button type="button" onClick={() => handleLogin('Facebook')}>
            Log in with Facebook
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: AuthSelectors.getUser(state),
});

const mapDispatchToProps = {
  handleLogin: login,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
