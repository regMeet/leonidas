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

const AdminNavBar = ({ name, photoURL, logout }) => (
  <div>
    <ButtonListWrapper>
      <ButtonWrapper>
        <Link to="/">Home</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to="/machine-charts">Machine Charts</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to="/users">Users</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to="/machine-data">Load Machine data</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to="/temperature-data">Load Temperature data</Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Avatar src={photoURL} />
        <span>{`Welcome Admin ${name}`}</span>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button primary value="Logout" onClick={logout} />
      </ButtonWrapper>
    </ButtonListWrapper>
  </div>
);

AdminNavBar.displayName = 'AdminNavBar';
AdminNavBar.propTypes = propTypes;
AdminNavBar.defaultProps = defaultProps;

export default AdminNavBar;
