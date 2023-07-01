import styled from '@emotion/styled';

export const SearchFieldCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 488px;
  width: 100%;
  background-color: darkgray;
  
  background-blend-mode: multiply;
  background-image: url('/backgroundSearch.jpg');
  background-position: center;
  background-size: cover;
  
  color: white;
  
  border-radius: 20px;
`;

interface FieldContainerProps {
  size: 'small' | 'large'
}

export const FieldContainer = styled.div<FieldContainerProps>`
  display: flex;
  align-items: center;
  
  width: 100%;
  height: ${({ size }) => (size === 'large' ? 50 : 38)}px;
  
  border-radius: 16px;
  border: 0;
  
  padding-left: 16px;
  padding-right: 16px;
  
  background: white;
`;

interface FieldProps {
  size: 'large' | 'small'
}

export const Field = styled.input<FieldProps>`
  font-size: 20px;
  width: 100%;

  border: 0;
  border-bottom: solid ${({ size }) => (size === 'large' ? 1 : 0)}px gray;
  
  &:focus {
    outline: none;
    border-bottom: solid ${({ size }) => (size === 'large' ? 2 : 0)}px black;
  }
`;

export const Label = styled.h1`
  margin-top: 0;
  margin-bottom: 16px;
`;

export const InsideCard = styled.div`
  max-width: 886px;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
`;

export const FiledSmallContainer = styled.div`
  width: 100%;
  
  border-radius: 12px;
  border: #ADB5BD solid 1px;
`;

export const HintsContainer = styled.div`
  width: 100%;
  height: 0;
`;
