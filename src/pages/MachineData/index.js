import React from 'react';
import NavigationHeader from 'modules/TopNavBar/containers';
import MachineDataTable from 'modules/MachineData/containers/MachineDataTable';

const MachineData = () => (
  <div>
    <NavigationHeader />
    <h1>Machine Data</h1>
    <MachineDataTable />
  </div>
);

MachineData.displayName = 'MachineData';

export default MachineData;
