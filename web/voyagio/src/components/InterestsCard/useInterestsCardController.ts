import { useState } from 'react';

const COUNT_OF_ACTIVTIES_TO_CHOOSE = 4;

export const useInterestsCardController = () => {
  const [indicesChosen, setIndicesChosen] = useState<boolean[]>(Array(10).fill(false));

  const activitiesRemaining = COUNT_OF_ACTIVTIES_TO_CHOOSE
    - indicesChosen.reduce<number>(
      (previousValue, currentValue) => (previousValue + (currentValue ? 1 : 0)),
      0,
    );
  const isSubmittingNotAvailable = activitiesRemaining > 0;

  const handleIndexChoose = (index: number) => () => {
    const newIndicesChosen = [...indicesChosen];

    if (indicesChosen[index] || isSubmittingNotAvailable) {
      newIndicesChosen[index] = !indicesChosen[index];
    }

    setIndicesChosen(newIndicesChosen);
  };

  const handleSubmit = () => {
    if (isSubmittingNotAvailable) return;
  };

  return {
    indicesChosen, handleIndexChoose, activitiesRemaining, handleSubmit, isSubmittingNotAvailable,
  } as const;
};
