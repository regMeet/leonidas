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
    users: PropTypes.array,
    errorMessage: PropTypes.string,
    fetchUsers: PropTypes.func.isRequired,
  };

  static defaultProps = {
    users: null,
    errorMessage: '',
  };

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  deleteUser = (email, user) => {
    console.log('email', email);
    console.log('user', user);
  };

  // eslint-disable-next-line
  actionsButtons = (email, user) => (
    <ActionsWrapper>
      <ClickableIcon icon="glyphicon-trash" handleOnClick={() => this.deleteUser(email, user)} />
    </ActionsWrapper>
  );

  render() {
    const { isLoading, users, errorMessage } = this.props;

    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }

    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h1>Users</h1>

        <TableContainer>
          <BootstrapTable data={users} striped hover headerStyle={tableStyle}>
            <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
            <TableHeaderColumn dataField="displayName">Name</TableHeaderColumn>
            <TableHeaderColumn dataField="email" isKey dataFormat={this.actionsButtons}>
              Actions
            </TableHeaderColumn>
          </BootstrapTable>
        </TableContainer>
      </div>
    );
  }
}

export default ListUsers;
