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
    handleChoose, chosen, activitiesRemaining, isSubmittingNotAvailable, handleSubmit, categories,
  } = useInterestsCardController();

  return (
    <InterestsCardContainer>
      <Heading>What activity do you like?</Heading>
      <InterestCardContainer>
        {
          categories
            .map(({ id, name, image_url }) => (
              <InterestCard
                key={id}
                name={name}
                imageUrl={image_url}
                chosen={chosen.includes(id)}
                onClick={handleChoose(id)}
              />
            ))
}
      </InterestCardContainer>
      <SubmitButtonContainer>
        <Button fullWidth size="md" disabled={isSubmittingNotAvailable} variant={isSubmittingNotAvailable ? 'light' : 'filled'} onClick={handleSubmit}>
          {isSubmittingNotAvailable
            ? `Choose ${activitiesRemaining} more`
            : 'Submit'}
        </Button>
      </SubmitButtonContainer>
    </InterestsCardContainer>
  );
};
