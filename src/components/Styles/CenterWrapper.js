import styled from 'styled-components';

const CenterWrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(50%);
  width: 500px;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`;

CenterWrapper.displayName = 'CenterWrapper';

export default CenterWrapper;
