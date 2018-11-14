import React from 'react';
import NavigationHeader from 'modules/TopNavBar/containers';
import TemperatureDataTable from 'modules/TemperatureData/containers/TemperatureDataTable';

const TemperatureData = () => (
  <div>
    <NavigationHeader />
    <h1>Temperature Data</h1>
    <TemperatureDataTable />
  </div>
);

TemperatureData.displayName = 'TemperatureData';

export default TemperatureData;
