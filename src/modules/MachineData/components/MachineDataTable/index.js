import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { colors } from 'utils/Theme';

import ClickableIcon from 'components/ClickableIcon';
import ActionsWrapper from './partials/ActionsWrapper';
import TableContainer from './partials/TableContainer';

const tableStyle = {
  backgroundColor: colors.primary,
  color: colors.secondary,
};

class ListUsers extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    entries: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchMachineData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    entries: null,
    errorMessage: '',
  };

  componentDidMount() {
    const { fetchMachineData } = this.props;
    fetchMachineData();
  }

  deleteEntry = (id, entry) => {
    console.log('id', id);
    console.log('entry', entry);
  };

  // eslint-disable-next-line
  actionsButtons = (id, entry) => (
    <ActionsWrapper>
      <ClickableIcon icon="glyphicon-trash" handleOnClick={() => this.deleteEntry(id, entry)} />
    </ActionsWrapper>
  );

  render() {
    const { isLoading, entries, errorMessage } = this.props;

    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }

    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <TableContainer>
          <BootstrapTable data={entries} striped hover headerStyle={tableStyle}>
            <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
            <TableHeaderColumn dataField="temperature">Temperature</TableHeaderColumn>
            <TableHeaderColumn dataField="id" isKey dataFormat={this.actionsButtons}>
              Actions
            </TableHeaderColumn>
          </BootstrapTable>
        </TableContainer>
      </div>
    );
  }
}

export default ListUsers;
