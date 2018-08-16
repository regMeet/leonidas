import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { roleEnum } from 'modules/Auth';
import DefaultNavBar from './DefaultNavBar';
import LoggedNavBar from './LoggedNavBar';
import AdminNavBar from './AdminNavBar';

class NavigationHeader extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  logoutUser = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/');
  };

  render() {
    const { user } = this.props;

    if (user) {
      const { name, role } = user;
      if (role === roleEnum.USER) {
        return <LoggedNavBar name={name} logout={this.logoutUser} />;
      }
      return <AdminNavBar name={name} logout={this.logoutUser} />;
    }
    return <DefaultNavBar />;
  }
}

export default withRouter(NavigationHeader);
