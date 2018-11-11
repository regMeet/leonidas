import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonListWrapper from 'components/Styles/ButtonListWrapper';
import ButtonWrapper from 'components/Styles/ButtonWrapper';
import Button from 'components/Button';
import Avatar from 'components/Avatar';

const propTypes = {
  name: PropTypes.string,
  photoURL: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

const defaultProps = {
  name: null,
  photoURL: null,
};

const LoggedNavBar = ({ name, photoURL, logout }) => (
  <div>
    <ButtonListWrapper>
      <ButtonWrapper>
        <Link to="/">Home</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Avatar src={photoURL} />
        <span>{`Welcome user ${name}`}</span>
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
