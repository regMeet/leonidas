import React from 'react';
import NavigationHeader from 'modules/TopNavBar/containers';

const Users = () => (
  <div>
    <NavigationHeader />
    <h1>Users</h1>
    <p>Welcome to the users page!</p>
  </div>
);

Users.displayName = 'Users';

export default Users;
