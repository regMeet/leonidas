import { connect } from 'react-redux';
import { selectors } from 'modules/MachineCharts';
import MachineCharts from 'modules/MachineCharts/components';

const mapStateToProps = state => ({
  chartData: selectors.getChartData(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MachineCharts);
