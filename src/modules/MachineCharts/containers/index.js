import { connect } from 'react-redux';
import { selectors, fetchData } from 'modules/MachineCharts';
import MachineCharts from 'modules/MachineCharts/components';

const mapStateToProps = state => ({
  chartData: selectors.getChartData(state),
  machineNames: selectors.getMachineNames(state),
  minTemperature: selectors.getMinTemperature(state),
  maxTemperature: selectors.getMaxTemperature(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  fetchData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MachineCharts);
