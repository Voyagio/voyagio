import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const AuthCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px 28px;
  background: #f8f9fd;
  border-radius: 20px;
  gap: 16px;
`;

export const AuthCardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const AuthCardTitle = styled.h4`
  font-size: 20px;
  margin: 0;
  font-weight: 400;
`;

export const AuthCardSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #adb5bd;
`;

export const AuthLinkGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 12px;
`;

export const AuthLinkSpan = styled.span`
  font-weight: 300;
  color: #212529;
`;

export const AuthLinkA = styled(Link)`
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  color: black;
`;
