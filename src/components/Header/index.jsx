import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'utils/Theme';

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: ${colors.white};
  background-color: ${colors.primary};
  display: inline-block;
  padding: 10px 30px;
  margin: 10px 0px;
`;

const propTypes = {
  title: PropTypes.string.isRequired,
};

const Header = ({ title }) => (
  <Wrapper>
    <Title>{title}</Title>
  </Wrapper>
);

Header.displayName = 'Header';
Header.propTypes = propTypes;

export default Header;
