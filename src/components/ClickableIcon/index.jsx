import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
`;

const propTypes = {
  icon: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

const ClickableIcon = ({ icon, handleOnClick }) => (
  <Wrapper>
    <link className={`glyphicon ${icon}`} onClick={handleOnClick} />
  </Wrapper>
);

ClickableIcon.displayName = 'ClickeableIcon';
ClickableIcon.propTypes = propTypes;

export default ClickableIcon;
