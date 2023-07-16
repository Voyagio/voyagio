import { useContext, useState } from 'react';
import { patchCollectionInfo } from './api/api';
import { CollectionContext } from '/src/contexts/collectionContext';

export const useToggleEdit = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const { id: collectionId, ...rest } = useContext(CollectionContext);

  const handleSubmit = async (
    name: string,
    description: string,
    imageUrl: string
  ) => {
    const res = await patchCollectionInfo(
      collectionId,
      name,
      description,
      imageUrl
    );

    if (!res) console.log('Post collection info error');

    setToggleEdit(!toggleEdit);
  };

  const toggle = () => setToggleEdit(!toggleEdit);

  return { toggleEdit, handleSubmit, toggle, rest } as const;
};
