import { connect } from 'react-redux';
import {
  selectors,
  fetchData,
  createDataEntry,
  updateDataById,
  deleteDataById,
} from 'modules/TemperatureData';
import TemperatureDataTable from 'modules/TemperatureData/components/TemperatureDataTable';

const mapStateToProps = state => ({
  data: selectors.getData(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  fetchData,
  createDataEntry,
  updateDataById,
  deleteDataById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureDataTable);
