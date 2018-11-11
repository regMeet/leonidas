import * as React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

const DateTypeProvider = props => (
  <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

export default DateTypeProvider;
