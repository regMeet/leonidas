import styled from 'styled-components';

const RowWrapper = styled.div`
  display: -webkit-flex; /* Safari */
  -webkit-flex-direction: row; /* Safari 6.1+ */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`;

RowWrapper.displayName = 'RowWrapper';

export default RowWrapper;
