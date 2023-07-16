import styled from '@emotion/styled';

interface HeaderContainerProps {
  contentCentered?: boolean
}

export const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  background-color: white;
  
  padding-left: 48px;
  padding-right: 48px;


  align-items: center;
  justify-content: ${({ contentCentered }) => (contentCentered ? 'center' : 'space-between')};
  
  height: 72px;
`;

export const Logo = styled.img`
  height: 32px;
`;

export const CircleImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;

  object-fit: cover;
`;
