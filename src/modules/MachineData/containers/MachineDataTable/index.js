import { connect } from 'react-redux';
import { selectors, fetchMachineData } from 'modules/MachineData';
import MachineDataTable from 'modules/MachineData/components/MachineDataTable';

const mapStateToProps = state => ({
  entries: selectors.getMachineData(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  fetchMachineData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MachineDataTable);
