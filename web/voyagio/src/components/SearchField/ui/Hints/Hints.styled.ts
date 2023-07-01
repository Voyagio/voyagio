import styled from '@emotion/styled';

export const HintsContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
  
  background: white;
  
  border-radius: 8px;
  
  z-index: 1050;
  
  display: flex;
  flex-direction: column;
`;

export const OptionButton = styled.button`
  width: 100%;
  padding: 8px 32px;
  border: none;

  z-index: 1050;

  background: white;

  text-align: start;
  
  &:hover {
    background: darkgray;
  }
  &:focus {
    outline: none;
    background: darkgray;
  }
  &:active {
    outline: none;
    background: gray;
  }
  
`;
