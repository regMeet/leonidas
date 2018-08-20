import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { roleEnum } from 'modules/Auth';
import DefaultNavBar from './DefaultNavBar/index';
import LoggedNavBar from './LoggedNavBar/index';
import AdminNavBar from './AdminNavBar/index';

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
      const { displayName, role } = user;
      if (role === roleEnum.USER) {
        return <LoggedNavBar name={displayName} logout={this.logoutUser} />;
      }
      return <AdminNavBar name={displayName} logout={this.logoutUser} />;
    }
    return <DefaultNavBar />;
  }
}

export default withRouter(NavigationHeader);
