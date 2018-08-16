import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StyledButton from './partials/StyledButton';

class Button extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
  };

  render() {
    const { value, onClick, ...rest } = this.props;

    return (
      <StyledButton onClick={onClick} {...rest}>
        {value}
      </StyledButton>
    );
  }
}

export default Button;
