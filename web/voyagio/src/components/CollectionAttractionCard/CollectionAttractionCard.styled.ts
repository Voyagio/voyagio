import styled from '@emotion/styled';

export const CollectionAttractionCardContainer = styled.div`
  position: relative;
  display: flex;
  border-radius: 16px;
  height: 132px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05),
    0px 36px 28px -7px rgba(0, 0, 0, 0.05),
    0px 17px 17px -7px rgba(0, 0, 0, 0.04);
`;

export const CardImage = styled.img`
  object-fit: cover;
  width: 45%;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 20px;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  font-family: 'Lato', sans-serif;
  font-style: normal;
  line-height: normal;
`;

export const CardName = styled.h3`
  font-size: 20px;
  font-weight: 400;
`;

export const InfoAddress = styled.p`
  color: #adb5bd;

  font-size: 12px;
  font-weight: 300;
`;

export const HeadingsGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & span {
    font-size: 12px;
    font-weight: 700;
  }
`;

export const RatingStar = styled.img`
  size: 14px;
`;

export const RatingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const VDivider = styled.div`
  width: 0.5px;
  height: 15px;
  background: #ced4da;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 12px;
  background: none;
  outline: none;
  border: none;
`;
