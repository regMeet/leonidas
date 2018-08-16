import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DefaultNavBar from './DefaultNavBar';
import LoggedNavBar from './LoggedNavBar';

class NavigationHeader extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    saveUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: null,
  };

  render() {
    const { name, saveUser, logout } = this.props;

    if (name) {
      return <LoggedNavBar name={name} logout={logout} />;
    }
    return <DefaultNavBar saveUser={saveUser} />;
  }
}

export default NavigationHeader;
