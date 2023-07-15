import styled from '@emotion/styled';
import { Modal } from '@mantine/core';

export const FilterModalStyled = styled(Modal)`
  & > div {
    padding-right: 0;
  }
  
  & section {
    margin-left: auto;
    
    height: 100vh;
    width: 312px;
    
    & > div {
      height: 100%;
    }
    
    border-radius: 20px 0 0 20px;
  }
`;

export const FilterContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
