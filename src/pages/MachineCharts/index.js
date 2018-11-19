import React from 'react';
import NavigationHeader from 'modules/TopNavBar/containers';
import MachineCharts from 'modules/MachineCharts/containers';

const MachineChartsPage = () => (
  <div>
    <NavigationHeader />
    <p>Charts!</p>
    <MachineCharts />
  </div>
);

MachineChartsPage.displayName = 'MachineChartsPage';

export default MachineChartsPage;
