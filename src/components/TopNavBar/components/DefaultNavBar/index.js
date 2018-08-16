import React from 'react';
import { Link } from 'react-router-dom';
import ButtonListWrapper from 'components/Styles/ButtonListWrapper';
import ButtonWrapper from 'components/Styles/ButtonWrapper';

const DefaultNavBar = () => (
  <div>
    <ButtonListWrapper>
      <ButtonWrapper>
        <Link to="/">Home</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to="/login">Log in</Link>
      </ButtonWrapper>
    </ButtonListWrapper>
  </div>
);

DefaultNavBar.displayName = 'DefaultNavBar';

export default DefaultNavBar;
