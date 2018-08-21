import React from 'react';
import NavigationHeader from 'modules/TopNavBar/containers';
import UsersTable from 'modules/Users/containers/UsersTable';

const Users = () => (
  <div>
    <NavigationHeader />
    <UsersTable />
  </div>
);

Users.displayName = 'Users';

export default Users;
