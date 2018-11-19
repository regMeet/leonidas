import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
// https://reactdatepicker.com/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateFormatter = ({ value }) => moment(value).format('LL');

DateFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const DateEditor = ({ value, onValueChange }) => (
  <DatePicker
    selected={moment(value).startOf('day')}
    onChange={changed => onValueChange(changed && changed.format())}
    placeholderText="Pick a day"
  />
);

DateEditor.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
};

DateEditor.defaultProps = {
  value: null,
};

const DateTypeProvider = props => (
  <DataTypeProvider formatterComponent={DateFormatter} editorComponent={DateEditor} {...props} />
);

export default DateTypeProvider;
