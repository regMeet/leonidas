import { connect } from 'react-redux';
import {
  selectors,
  fetchMachineData,
  createMachineDataEntry,
  updateMachineDataById,
  deleteMachineDataById,
} from 'modules/MachineData';
import MachineDataTable from 'modules/MachineData/components/MachineDataTable';

const mapStateToProps = state => ({
  machineData: selectors.getMachineData(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  fetchMachineData,
  createMachineDataEntry,
  updateMachineDataById,
  deleteMachineDataById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MachineDataTable);
