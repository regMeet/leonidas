import React, { PureComponent } from 'react';
import { Card } from 'reactstrap';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';

const getRowId = row => row.id;

class MachineDataSection extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: [
        { id: 1, sex: 'Female', name: 'Sandra', city: 'Las Vegas', car: 'Audi A4' },
        { id: 2, sex: 'Male', name: 'Paul', city: 'Paris', car: 'Nissan Altima' },
      ],
    };
  }

  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  };

  render() {
    const { rows, columns } = this.state;

    return (
      <Card>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
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
