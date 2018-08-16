import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors as AuthSelectors, saveUser } from 'modules/Auth';
import NavigationHeader from 'components/TopNavBar/containers';

class Login extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    error: PropTypes.bool,
    handleSaveUser: PropTypes.func.isRequired,
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

  loginAdmin = () => {
    const user = {
      name: 'Alan',
      role: 'ADMIN',
    };

    const { handleSaveUser, history } = this.props;
    handleSaveUser(user);
    history.push('/');
  };

  loginUser = () => {
    const user = {
      name: 'Alan',
      role: 'USER',
    };

    const { handleSaveUser, history } = this.props;
    handleSaveUser(user);
    history.push('/');
  };

  render() {
    const { error } = this.props;

    return (
      <div>
        <NavigationHeader />

        <h1>Login</h1>
        {error && <p>You were not logged in</p>}
        <p>Welcome to the Login page!</p>

        <div>
          <button type="button" onClick={this.loginAdmin}>
            Log in with Facebook - admin
          </button>
          <button type="button" onClick={this.loginUser}>
            Log in with Google - user
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
  handleSaveUser: saveUser,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
