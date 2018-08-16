import styled from 'styled-components';
import { colors } from 'utils/Theme';

const StyledButton = styled('button')`
  color: ${props => (props.primary ? colors.secondary : colors.primary)};
  background-color: ${props => (props.primary ? colors.primary : colors.secondary)};
  border: 2px solid ${colors.primary}
  box-sizing: border-box;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  max-width:150px;
  max-height:50px;
  :hover {
    background-color: ${colors.primary};
    color: ${colors.secondary};
  }
`;

export default StyledButton;
