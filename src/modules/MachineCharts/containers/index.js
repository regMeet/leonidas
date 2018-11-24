import { connect } from 'react-redux';
import { selectors, fetchData, checkboxMachineName } from 'modules/MachineCharts';
import MachineCharts from 'modules/MachineCharts/components';

const mapStateToProps = state => ({
  chartData: selectors.getChartData(state),
  machineNames: selectors.getMachineNames(state),
  whiteListMachineNames: selectors.getWhiteListNames(state),
  minTemperature: selectors.getMinTemperature(state),
  maxTemperature: selectors.getMaxTemperature(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  fetchData,
  checkboxMachineName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MachineCharts);
