import * as React from 'react';
import * as PropTypes from 'prop-types';

const getColor = t => {
  if (t >= 600) {
    return '#fc7a76';
  }
  if (t >= 300 && t < 600) {
    return '#ffb294';
  }
  if (t >= 150 && t < 300) {
    return '#ffd59f';
  }
  return '#c3e2b7';
};

const HighlightedCell = ({ tableColumn, value, children, style }) => (
  <td
    style={{
      backgroundColor: getColor(value),
      textAlign: tableColumn.align,
      ...style,
    }}
  >
    {children}
  </td>
);
HighlightedCell.propTypes = {
  value: PropTypes.number.isRequired,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
  children: PropTypes.node,
};
HighlightedCell.defaultProps = {
  style: {},
  tableColumn: {},
  children: undefined,
};

export default HighlightedCell;
