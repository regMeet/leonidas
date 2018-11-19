import { connect } from 'react-redux';
import { selectors as MachineDataSelectors } from 'modules/MachineData';
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
  machineData: MachineDataSelectors.getMachineData(state),
  isLoading: MachineDataSelectors.isLoading(state) || selectors.isLoading(state),
  errorMessage: MachineDataSelectors.getErrorMessage(state) || selectors.getErrorMessage(state),
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
