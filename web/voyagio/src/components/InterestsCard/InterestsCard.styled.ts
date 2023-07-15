import styled from '@emotion/styled';

export const InterestsCardContainer = styled.div`
  position: relative;

  width: 880px;
  height: 618px;
  background-color: #F8F9FD;
  
  border: 0 solid;
  border-radius: 20px;

  box-shadow: 0 4px 48px 0 rgba(31, 93, 151, 0.15);
  backdrop-filter: blur(50px);
  
  padding: 52px 60px;
  
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  overflow: hidden;
`;

export const Heading = styled.h2`
  text-align: center;
  font-weight: 400;
`;

export const InterestCardContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill,minmax(144px, auto));

  padding-bottom: 120px;
  
  overflow: scroll;
`;

export const SubmitButtonContainer = styled.div`
  height: 112px;
  width: 100%;
  position: absolute;

  background-color: #F8F9FD;

  display: flex;
  justify-content: center;
  align-items: center;
  
  padding: 0 60px;
  
  bottom: 0;
  left: 0;

  box-shadow: 0px -5px 10px 0px rgba(114, 114, 114, 0.25);
`;
