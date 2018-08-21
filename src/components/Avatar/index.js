import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const propTypes = {
  src: PropTypes.string.isRequired,
};

const Avatar = ({ src }) => <Image src={src} />;

Avatar.displayName = 'Avatar';
Avatar.propTypes = propTypes;

export default Avatar;
