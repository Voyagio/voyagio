import styled from '@emotion/styled';

export const AccountInfoContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 34px 32px;
  background: white;
  border-radius: 20px 20px 0 0;
  align-items: center;
  box-shadow: 0px 5px 12px 0px rgba(130, 130, 130, 0.1);

  font-family: 'Lato', sans-serif;
`;

export const AccountAvatar = styled.img`
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  & h3 {
    font-size: 20px;
    font-weight: 400;
  }

  & h3 span {
    color: #0b94f8;
  }

  & p {
    font-size: 12px;
    font-weight: 300;
    color: #adb5bd;
  }
`;
