import { useContext, useState } from 'react';
import { patchCollectionInfo } from './api/api';
import { CollectionContext } from '/src/contexts/collectionContext';

export const useToggleEdit = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const collectionId = useContext(CollectionContext);

  const handleSubmit = async (name: string, description: string) => {
    const res = await patchCollectionInfo(collectionId, name, description);

    if (!res) console.log('Post collection info error');

    setToggleEdit(!toggleEdit);
  };

  const toggle = () => setToggleEdit(!toggleEdit);

  return { toggleEdit, handleSubmit, toggle } as const;
};
