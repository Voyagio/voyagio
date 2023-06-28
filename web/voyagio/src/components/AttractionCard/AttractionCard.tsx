import { VerticalDivider } from '/src/components/uikit';
import { ActionIcon, Button, Flex } from '@mantine/core';
import { IconHeart, IconStar } from '@tabler/icons-react';
import { FC } from 'react';
import {
  AdditionalInfoContainer, Address, AttractionImage, ButtonsContainer, CardContainer,
} from './AttractionCard.styled';

export const AttractionCard: FC = () => (
  <CardContainer>
    <AttractionImage src="/backgroundSearch.jpg" />
    <div>
      <h3>Millennium Bridge</h3>
      <Address>Millennium Bridge</Address>
      <AdditionalInfoContainer>
        <Flex align="center" gap={6}>
          <IconStar size={17} />
          <p>5.0 Rating</p>
        </Flex>
        <VerticalDivider />
        <p>Infrastructure</p>
        <VerticalDivider />
        <p>Attraction</p>
      </AdditionalInfoContainer>
      <ButtonsContainer>
        <Button fullWidth>Add in trip</Button>
        <Flex justify="center" align="center">
          <ActionIcon variant="subtle">
            <IconHeart color="black" />
          </ActionIcon>
        </Flex>
      </ButtonsContainer>
    </div>
  </CardContainer>
);
