import { useCategories } from '/src/components/Filter/api';
import { putUserInterests } from '/src/components/InterestsCard/api';
import { useUserInterests } from '/src/components/InterestsCard/api/useUserInterests.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const COUNT_OF_ACTIVTIES_TO_CHOOSE = 4;

export const useInterestsCardController = () => {
  const { categories } = useCategories();
  const { userInterests, fetchUserInterests } = useUserInterests();
  const navigate = useNavigate();

  const [chosen, setChosen] = useState<string[]>(userInterests.map((element) => element.id));

  useEffect(() => {
    setChosen(userInterests.map((element) => element.id));
  }, [userInterests]);

  const activitiesRemaining = COUNT_OF_ACTIVTIES_TO_CHOOSE - chosen.length;
  const isSubmittingNotAvailable = activitiesRemaining > 0;

  const handleChoose = (id: string) => () => {
    const isChosen = chosen.includes(id);

    if (isChosen) {
      const newChosen = [...chosen];
      newChosen.splice(newChosen.indexOf(id), 1);
      setChosen(newChosen);
    } else {
      setChosen([...chosen, id]);
    }
  };

  const handleSubmit = async () => {
    if (isSubmittingNotAvailable) return;

    await putUserInterests(chosen);
    fetchUserInterests().then();
    navigate('/search');
  };

  return {
    chosen, handleChoose, activitiesRemaining, handleSubmit, isSubmittingNotAvailable, categories,
  } as const;
};
