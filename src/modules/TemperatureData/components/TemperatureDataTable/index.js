import React, { PureComponent } from 'react';
import filter from 'lodash/fp/filter';
import find from 'lodash/fp/find';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import TemperatureTypeProvider from 'components/Table/cellProviders/temperature-type-provider';
import DateTypeProvider from 'components/Table/cellProviders/date-type-provider';
import HighlightedCell from 'components/Table/cellTypes/highlighted-cell';
import LookupEditCell from 'components/Table/cellTypes/lookup-edit-cell';
import Loading from 'components/Loading';
import CommandButtons from 'components/Table/CommandButtons';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const Cell = props => {
  const { column } = props;
  if (column.name === 'temperature') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

class TemperatureDataSection extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array,
    machineData: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchData: PropTypes.func.isRequired,
    createDataEntry: PropTypes.func.isRequired,
    updateDataById: PropTypes.func.isRequired,
    deleteDataById: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
    machineData: null,
    errorMessage: '',
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
    const { fetchData } = this.props;
    fetchData();
  }

  changeSorting = sorting => this.setState({ sorting });

  changeCurrentPage = currentPage => this.setState({ currentPage });

  changePageSize = pageSize => this.setState({ pageSize });

  changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });

  changeRowChanges = rowChanges => this.setState({ rowChanges });

  changeAddedRows = addedRows => {
    const { machineData } = this.props;
    this.setState({
      addedRows: addedRows.map(
        row =>
          Object.keys(row).length
            ? row
            : {
                name: machineData[0].name, // TODO: look for the available machines
                temperature: 100,
                date: moment().format(),
              },
      ),
    });
  };

  commitChanges = ({ added, changed, deleted }) => {
    const { createDataEntry, updateDataById, data } = this.props;
    const { deletingRowIds } = this.state;
    if (added) {
      createDataEntry(added);
      this.setState({ addedRows: [] });
    }
    if (changed) {
      updateDataById(changed);
      this.setState({ editingRowIds: [] });
    }
    if (deleted) {
      const newDeletingRowIds = [...deletingRowIds, deleted[0]];
      const deletingRow = filter(entry =>
        find(deletingRowId => deletingRowId === entry.id)(newDeletingRowIds),
      )(data);

      this.setState({ deletingRowIds: newDeletingRowIds, deletingRow });
    }
  };

  cancelDelete = () => this.setState({ deletingRowIds: [] });

  deleteRows = () => {
    const { deleteDataById } = this.props;
    const { deletingRowIds } = this.state;
    deletingRowIds.forEach(rowId => {
      deleteDataById(rowId);
    });
    this.setState({ deletingRowIds: [] });
  };

  cell = props => {
    const { column } = props;
    if (column.name === 'temperature') {
      return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
  };

  editCell = props => {
    const { machineData } = this.props;
    const { column } = props;
    if (column.name === 'name' && machineData) {
      return <LookupEditCell {...props} availableColumnValues={machineData} />;
    }
    return <TableEditRow.Cell {...props} />;
  };

  render() {
    const { isLoading, data, errorMessage } = this.props;

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

    // TODO: make some fields mandatory

    return (
      <Card>
        <Grid rows={data} columns={tableColumns} getRowId={row => row.id}>
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

          <Table columnExtensions={tableColumnExtensions} cellComponent={this.cell} />
          <TableHeaderRow showSortingControls />
          <TableEditRow cellComponent={this.editCell} />
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

export default TemperatureDataSection;
