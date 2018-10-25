import React from 'react';
import NavigationHeader from 'modules/TopNavBar/containers';
import MachineDataSection from 'modules/MachineData/components';

const MachineData = () => (
  <div>
    <NavigationHeader />
    <h1>Machine Data</h1>
    <MachineDataSection />
  </div>
);

MachineData.displayName = 'MachineData';

export default MachineData;
