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

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  
  width: 100%;
  height: 50px;
  
  border-radius: 16px;
  border: 0;
  
  padding-left: 16px;
  padding-right: 16px;
  
  background: white;
`;

export const Field = styled.input`
  font-size: 20px;
  width: 100%;

  border: 0;
  border-bottom: solid 1px gray;
  
  &:focus {
    outline: none;
    border-bottom: solid 2px black;
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
