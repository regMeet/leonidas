import React, { PureComponent } from 'react';
import '@devexpress/dx-react-grid'; // State or Local Processing Plugins
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

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
        { sex: 'Female', name: 'Sandra', city: 'Las Vegas', car: 'Audi A4' },
        { sex: 'Male', name: 'Paul', city: 'Paris', car: 'Nissan Altima' },
        { sex: 'Male', name: 'Mark', city: 'Paris', car: 'Honda Accord' },
        { sex: 'Male', name: 'Paul', city: 'Paris', car: 'Nissan Altima' },
        { sex: 'Female', name: 'Linda', city: 'Austin', car: 'Toyota Corolla' },
        { sex: 'Male', name: 'Robert', city: 'Las Vegas', car: 'Chevrolet Cruze' },
        { sex: 'Female', name: 'Lisa', city: 'London', car: 'BMW 750' },
        { sex: 'Male', name: 'Mark', city: 'Chicago', car: 'Toyota Corolla' },
        { sex: 'Male', name: 'Thomas', city: 'Rio de Janeiro', car: 'Honda Accord' },
        { sex: 'Male', name: 'Robert', city: 'Las Vegas', car: 'Honda Civic' },
        { sex: 'Female', name: 'Betty', city: 'Paris', car: 'Honda Civic' },
        { sex: 'Male', name: 'Robert', city: 'Los Angeles', car: 'Honda Accord' },
        { sex: 'Male', name: 'William', city: 'Los Angeles', car: 'Honda Civic' },
        { sex: 'Male', name: 'Mark', city: 'Austin', car: 'Nissan Altima' },
      ],
    };
  }

  render() {
    const { rows, columns } = this.state;

    return (
      <Grid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    );
  }
}

export default MachineDataSection;
