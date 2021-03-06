import * as React from 'react';
import * as PropTypes from 'prop-types';

const LookupEditCell = ({ column, availableColumnValues, value, onValueChange }) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: 1,
    }}
  >
    <select
      className="form-control"
      style={{ width: '100%', textAlign: column.align }}
      value={value}
      onChange={e => onValueChange(e.target.value)}
    >
      {availableColumnValues.map(val => (
        <option key={val.id} value={val.name}>
          {val.name}
        </option>
      ))}
    </select>
  </td>
);

LookupEditCell.propTypes = {
  column: PropTypes.object.isRequired,
  availableColumnValues: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default LookupEditCell;
