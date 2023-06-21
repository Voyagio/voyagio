import styled from '@emotion/styled';

export const SearchFieldCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 488px;
  width: 100%;
  background-color: gray;
  
  background-image: url('/backgroundSearch.jpg');
  background-position: center;
  background-size: cover;
  
  color: white;
  font-family: 'Lato', sans-serif;
  
  border-radius: 20px;
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  
  width: 886px;
  height: 50px;
  
  border-radius: 16px;
  border: 0;
  
  padding-left: 16px;
  padding-right: 16px;
  
  background: white;
`;

export const Field = styled.input`
  font-size: 24px;
  width: 100%;
  
  border: 0;
  border-bottom: solid 1px gray;
  
  &:focus {
    outline: none;
    border-bottom: solid 1px black;

  }
`;

export const Label = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
`;
