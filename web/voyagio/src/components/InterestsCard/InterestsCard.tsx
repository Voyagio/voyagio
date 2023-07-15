import {
  Heading,
  InterestCardContainer,
  InterestsCardContainer, SubmitButtonContainer,
} from '/src/components/InterestsCard/InterestsCard.styled.ts';
import { InterestCard } from '/src/components/InterestsCard/ui/InterestCard/InterestCard.tsx';
import { useInterestsCardController } from '/src/components/InterestsCard/useInterestsCardController.ts';
import { Button } from '@mantine/core';

export const InterestsCard = () => {
  const {
    handleIndexChoose, indicesChosen, activitiesRemaining, isSubmittingNotAvailable, handleSubmit,
  } = useInterestsCardController();

  return (
    <InterestsCardContainer>
      <Heading>What activity do you like?</Heading>
      <InterestCardContainer>
        {Array(10)
          .fill('')
          .map((value, index) => (
            <InterestCard
              chosen={indicesChosen[index]}
              onClick={handleIndexChoose(index)}
            />
          ))}
      </InterestCardContainer>
      <SubmitButtonContainer>
        <Button fullWidth size="md" variant={isSubmittingNotAvailable ? 'light' : 'filled'} onClick={handleSubmit}>
          {isSubmittingNotAvailable
            ? `Choose ${activitiesRemaining} more`
            : 'Submit'}
        </Button>
      </SubmitButtonContainer>
    </InterestsCardContainer>
  );
};
