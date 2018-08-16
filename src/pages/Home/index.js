import React from 'react';
import NavigationHeader from 'components/TopNavBar/containers';

const Home = () => (
  <div>
    <NavigationHeader />
    <h1>Home</h1>
    <p>Welcome home!</p>
  </div>
);

Home.displayName = 'Home';

export default Home;
