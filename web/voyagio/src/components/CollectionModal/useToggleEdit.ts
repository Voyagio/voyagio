import { useState } from 'react';
import { postNewCollectionInfo } from './api/api';

export const useToggleEdit = () => {
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleSubmit = async (name: string, description: string) => {
    const res = await postNewCollectionInfo(name, description);

    if (!res) console.log('Post collection info error');

    setToggleEdit(!toggleEdit);
  };

  const toggle = () => setToggleEdit(!toggleEdit);

  return { toggleEdit, handleSubmit, toggle } as const;
};
