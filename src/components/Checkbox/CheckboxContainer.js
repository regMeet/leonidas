import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/fp/map';
import Checkbox from '.';

class CheckboxContainer extends React.Component {
  static propTypes = {
    checkboxes: PropTypes.object,
    onHandleCheckbox: PropTypes.func.isRequired,
  };

  static defaultProps = {
    checkboxes: {},
  };

  handleChange = e => {
    const { name, checked } = e.target;
    const { onHandleCheckbox } = this.props;
    onHandleCheckbox(name, checked);
  };

  render() {
    const { checkboxes } = this.props;

    return (
      <React.Fragment>
        {map(m => (
          <div key={m.key}>
            {m.name}
            <Checkbox name={m.name} checked={m.checked} onChange={this.handleChange} />
          </div>
        ))(checkboxes)}
      </React.Fragment>
    );
  }
}

export default CheckboxContainer;
