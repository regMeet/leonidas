import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const Shading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
`;

const rotate = keyframes`
  from { transform: scale(1) rotate(0deg); }
  to { transform: scale(1) rotate(360deg); }
`;

const Icon = styled.div`
  position: absolute;
  font-size: 25px;
  top: calc(45% - 10px);
  left: calc(50% - 10px);
  -animation: ${rotate} spin 0.7s infinite linear;
  -webkit-animation: ${rotate} 0.7s infinite linear;
`;

const Loading = () => (
  <Shading>
    <Icon>
      <span className="glyphicon glyphicon-refresh" />
    </Icon>
  </Shading>
);

export default Loading;
