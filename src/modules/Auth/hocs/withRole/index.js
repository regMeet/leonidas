import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectors } from 'modules/Auth';
import NoMatch from 'pages/NoMatch';
import withAuth from 'modules/Auth/hocs/withAuth';

const withRole = allowedRoles => WrappedComponent => {
  class Authorization extends PureComponent {
    static propTypes = {
      role: PropTypes.string,
    };

    static defaultProps = {
      role: '',
    };

    render() {
      const { role } = this.props;
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      }
      return <NoMatch />;
    }
  }

  const mapStateToProps = state => ({
    role: selectors.getRole(state),
  });

  return withAuth(connect(mapStateToProps)(Authorization));
};

export default withRole;
