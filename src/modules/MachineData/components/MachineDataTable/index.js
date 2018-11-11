import React, { PureComponent } from 'react';
import filter from 'lodash/fp/filter';
import find from 'lodash/fp/find';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card } from 'reactstrap';
import {
  SortingState,
  PagingState,
  EditingState,
  SummaryState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import TemperatureTypeProvider from './cellProviders/temperature-type-provider';
import DateTypeProvider from './cellProviders/date-type-provider';
import HighlightedCell from './cellTypes/highlighted-cell';
import Loading from './partials/loading';
import CommandButtons from './partials/CommandButtons';

const Cell = props => {
  const { column } = props;
  if (column.name === 'temperature') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

class MachineDataSection extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    machineData: PropTypes.array,
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
    // put some other loading spinners when creating, editing, deleting
  };

  constructor(props) {
    super(props);

    this.state = {
      tableColumns: [
        { name: 'name', title: 'Nombre Maquina' },
        { name: 'temperature', title: 'Temperatura' },
        { name: 'date', title: 'Fecha' },
      ],
      tableColumnExtensions: [
        { columnName: 'name', width: 200 },
        { columnName: 'temperature', width: 180, align: 'right' },
        { columnName: 'date', width: 180 },
      ],
      sorting: [],
      currentPage: 0,
      pageSize: 0,
      pageSizes: [5, 10, 0],
      temperatureColumns: ['temperature'],
      dateColumns: ['date'],
      totalSummaryItems: [
        { columnName: 'temperature', type: 'avg' },
        { columnName: 'temperature', type: 'count' },
      ],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      // deleting
      deletingRowIds: [],
      deletingRow: [],
    };
  }

  componentDidMount() {
    const { fetchMachineData } = this.props;
    fetchMachineData();
  }

  changeSorting = sorting => this.setState({ sorting });

  changeCurrentPage = currentPage => this.setState({ currentPage });

  changePageSize = pageSize => this.setState({ pageSize });

  changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });

  changeRowChanges = rowChanges => this.setState({ rowChanges });

  changeAddedRows = addedRows =>
    this.setState({
      addedRows: addedRows.map(
        row =>
          Object.keys(row).length
            ? row
            : {
                name: 'Maquina A', // look for the available machines
                temperature: 100,
                date: new Date().toISOString().split('T')[0],
              },
      ),
    });

  commitChanges = ({ added, changed, deleted }) => {
    const { createMachineDataEntry, updateMachineDataById, machineData } = this.props;
    const { deletingRowIds } = this.state;
    if (added) {
      createMachineDataEntry(added);
    }
    if (changed) {
      updateMachineDataById(changed);
    }
    if (deleted) {
      const newDeletingRowIds = [...deletingRowIds, deleted[0]];
      const deletingRow = filter(entry =>
        find(deletingRowId => deletingRowId === entry.id)(newDeletingRowIds),
      )(machineData);

      this.setState({ deletingRowIds: newDeletingRowIds, deletingRow });
    }
  };

  cancelDelete = () => this.setState({ deletingRowIds: [] });

  deleteRows = () => {
    const { deleteMachineDataById } = this.props;
    const { deletingRowIds } = this.state;
    deletingRowIds.forEach(rowId => {
      deleteMachineDataById(rowId);
    });
    this.setState({ deletingRowIds: [] });
  };

  render() {
    const { isLoading, machineData, errorMessage } = this.props;

    const {
      tableColumns,
      tableColumnExtensions,
      sorting,
      currentPage,
      pageSize,
      pageSizes,
      temperatureColumns,
      dateColumns,
      totalSummaryItems,
      editingRowIds,
      rowChanges,
      addedRows,
      deletingRowIds,
      deletingRow,
    } = this.state;

    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }

    if (isLoading) {
      return <Loading />;
    }

    // TODO: add date picker
    // TODO: make some fields mandatory

    return (
      <Card>
        <Grid rows={machineData} columns={tableColumns} getRowId={row => row.id}>
          <SortingState sorting={sorting} onSortingChange={this.changeSorting} />

          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />

          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <SummaryState totalItems={totalSummaryItems} />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />

          <TemperatureTypeProvider for={temperatureColumns} />
          <DateTypeProvider for={dateColumns} />

          <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
          <TableEditColumn
            width={120}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={CommandButtons}
          />

          <TableSummaryRow />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>

        <Modal size="large" isOpen={!!deletingRowIds.length} onClosed={this.cancelDelete}>
          <ModalHeader>Delete Row</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete the following row?</p>
            <Grid rows={deletingRow} columns={tableColumns}>
              <TemperatureTypeProvider for={temperatureColumns} />
              <DateTypeProvider for={dateColumns} />
              <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
              <TableHeaderRow />
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.cancelDelete}>Cancel</Button>
            <Button className="btn-danger" onClick={this.deleteRows}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    );
  }
}

export default MachineDataSection;
