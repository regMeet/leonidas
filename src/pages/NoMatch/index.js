import React from 'react';
import NavigationHeader from 'components/TopNavBar/containers';

const NoMatch = () => (
  <div>
    <NavigationHeader />
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

NoMatch.displayName = 'NoMatch';

export default NoMatch;
