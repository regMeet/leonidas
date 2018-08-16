import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonListWrapper from 'components/Styles/ButtonListWrapper';
import ButtonWrapper from 'components/Styles/ButtonWrapper';
import Button from 'components/Button';

const login = saveUser => {
  const user = {
    name: 'Alan',
    role: 'ADMIN',
  };

  saveUser(user);
};

const propTypes = {
  saveUser: PropTypes.func.isRequired,
};

const DefaultNavBar = ({ saveUser }) => (
  <div>
    <ButtonListWrapper>
      <ButtonWrapper>
        <Link to="/">Home</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button primary value="Log in" onClick={() => login(saveUser)} />
      </ButtonWrapper>
    </ButtonListWrapper>
  </div>
);

DefaultNavBar.displayName = 'DefaultNavBar';
DefaultNavBar.propTypes = propTypes;

export default DefaultNavBar;
