import styled from '@emotion/styled';

export interface StyledButtonProps {
  buttonWidth?: string;
  variant?: 'primary' | 'secondary';
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ buttonWidth }) => (buttonWidth ? `width: ${buttonWidth};` : '')}

  border: 0 solid;
  padding: 8px 14px;
  border-radius: 4px;

  font-weight: bold;
  font-size: 14px;

  ${({ variant }) => (variant === 'secondary'
    ? `
      background-color: #F8F9FD;
      color: black;
     ` : `
      background-color: #0B94F8;
      color: white;
     `)}
  &:hover {
    background-color: #298cd5;
    color: white;
  }

  &:active {
    background-color: #23659d;
    color: white;
  }

  transition: all 0.1s ease-in;
`;

export const IconContainer = styled.span`
  display: flex;
  height: 17px;
  justify-content: center;
  width: min-content;
`;
