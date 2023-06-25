import { Button, VerticalDivider } from '/src/components/uikit';
import { Icon } from '/src/components/uikit/Icon.ts';
import { FC } from 'react';
import {
  AdditionalInfoContainer, Address, AttractionImage, ButtonsContainer, CardContainer,
} from './AttractionCard.styled';
import FavsLogo from '/src/assets/icons/favs.svg';

export const AttractionCard: FC = () => (
  <CardContainer>
    <AttractionImage src="/backgroundSearch.jpg" />
    <div>
      <h3>Millennium Bridge</h3>
      <Address>Millennium Bridge</Address>
      <AdditionalInfoContainer>
        <p>5.0 Rating</p>
        <VerticalDivider />
        <p>Infrastructure</p>
        <VerticalDivider />
        <p>Attraction</p>
      </AdditionalInfoContainer>
      <ButtonsContainer>
        <Button buttonWidth="100%">Add in trip</Button>
        <Button variant="secondary" icon={<Icon src={FavsLogo} />} />
      </ButtonsContainer>
    </div>
  </CardContainer>
);
