import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f8f9fd;
  gap: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  padding: 32px 32px 20px 32px;
  gap: 20px;
  background: white;
  box-shadow: 0px 1px 0px #ced4da;
`;

export const ModalHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;

  & h3 {
    font-size: 32px;
    font-weight: 400;
  }

  & p {
    color: #ced4da;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const ModalHeaderIcon = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

export const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 32px 32px 32px;
`;

export const MapButton = styled.button`
  position: absolute;
  top: 38.5px;
  right: 32px;
  display: flex;
  padding: 2px;
  border-radius: 2px;
  background: rgba(11, 148, 248, 0.15);
  box-shadow: 0px 5px 12px 0px rgba(130, 130, 130, 0.1);
  border: none;
  outline: none;
`;
