import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'reactstrap';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';

class MachineDataSection extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    machineData: PropTypes.array,
    tableColumns: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchMachineData: PropTypes.func.isRequired,
    createMachineDataEntry: PropTypes.func.isRequired,
    updateMachineDataById: PropTypes.func.isRequired,
    deleteMachineDataById: PropTypes.func.isRequired,
  };

  static defaultProps = {
    machineData: null,
    errorMessage: '',
    // TODO: take this out
    tableColumns: [
      { name: 'name', title: 'Nombre Maquina' },
      { name: 'type', title: 'Tipo' },
      { name: 'city', title: 'Ciudad' },
      { name: 'temperature', title: 'Temperatura' },
      { name: 'date', title: 'Fecha' },
    ],
  };

  componentDidMount() {
    const { fetchMachineData } = this.props;
    fetchMachineData();
  }

  commitChanges = ({ added, changed, deleted }) => {
    const { createMachineDataEntry, updateMachineDataById, deleteMachineDataById } = this.props;
    if (added) {
      createMachineDataEntry(added);
    }
    if (changed) {
      updateMachineDataById(changed);
    }
    if (deleted) {
      deleteMachineDataById(deleted);
    }
  };

  render() {
    const { isLoading, machineData, tableColumns, errorMessage } = this.props;

    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }

    if (isLoading) {
      return <div>Loading</div>;
    }

    // TODO: add date picker
    // TODO: make some fields mandatory

    return (
      <Card>
        <Grid rows={machineData} columns={tableColumns} getRowId={row => row.id}>
          <EditingState onCommitChanges={this.commitChanges} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Card>
    );
  }
}

export default MachineDataSection;
