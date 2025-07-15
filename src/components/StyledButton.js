import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.backgroundColor || 'blue'};
  color: ${props => props.color || 'white'};
  padding: ${props => props.padding || '10px'};
  border: none;
  border-radius: ${props => props.borderRadius || '5px'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.hoverBackgroundColor || 'darkblue'};
  }
`;

export default StyledButton;
