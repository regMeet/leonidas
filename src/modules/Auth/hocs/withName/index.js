import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectors } from 'modules/Auth';

const withName = Component => {
  const propTypes = {
    name: PropTypes.string,
  };

  const defaultProps = {
    name: '',
  };

  const withNameComponent = props => <Component {...props} />;

  withNameComponent.displayName = `withName(${Component.displayName})`;
  withNameComponent.propTypes = propTypes;
  withNameComponent.defaultProps = defaultProps;

  return withNameComponent;
};

const mapStateToProps = state => ({
  name: selectors.getUserName(state),
});

export default compose(
  connect(mapStateToProps),
  withName,
);
