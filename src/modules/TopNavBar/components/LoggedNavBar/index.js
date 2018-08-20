import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonListWrapper from 'components/Styles/ButtonListWrapper';
import ButtonWrapper from 'components/Styles/ButtonWrapper';
import Button from 'components/Button';

const propTypes = {
  name: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

const defaultProps = {
  name: null,
};

const LoggedNavBar = ({ name, logout }) => (
  <div>
    <ButtonListWrapper>
      <ButtonWrapper>
        <span>{`Welcome ${name}`}</span>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to="/">Home</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button primary value="Logout" onClick={logout} />
      </ButtonWrapper>
    </ButtonListWrapper>
  </div>
);

LoggedNavBar.displayName = 'LoggedNavBar';
LoggedNavBar.propTypes = propTypes;
LoggedNavBar.defaultProps = defaultProps;

export default LoggedNavBar;
