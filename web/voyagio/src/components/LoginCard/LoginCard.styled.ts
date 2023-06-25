import styled from '@emotion/styled';

export const LoginCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px 28px;
  background: #f8f9fd;
  border-radius: 20px;
  gap: 16px;
`;

export const LoginCardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const LoginCardTitle = styled.h4`
  font-size: 20px;
  margin: 0;
  font-weight: 400;
`;

export const LoginCardSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #adb5bd;
`;

export const LoginLinkGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 12px;
`;

export const LoginLinkSpan = styled.span`
  font-weight: 300;
  color: #212529;
`;

export const LoginLinkA = styled.a`
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  color: black;
`;
