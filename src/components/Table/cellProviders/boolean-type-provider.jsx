import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const BooleanFormatter = ({ value }) => (
  <span className="badge badge-secondary">{value ? 'Yes' : 'No'}</span>
);

BooleanFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const BooleanEditor = ({ value, onValueChange }) => (
  <select
    className="form-control"
    value={value}
    onChange={e => onValueChange(e.target.value === 'true')}
  >
    <option value={false}>No</option>
    <option value>Yes</option>
  </select>
);

BooleanEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

export default BooleanTypeProvider;
