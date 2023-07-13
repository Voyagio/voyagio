import { useContext, useState } from 'react';
import { getRandomCollectionImage } from '../CreateCollectionCard/api';
import { CollectionContext } from '/src/contexts/collectionContext';

export const useNewModalInfo = () => {
  const {
    title: collectionTitle,
    description: collectionDesc,
    imageUrl: collectionImage,
  } = useContext(CollectionContext);

  const [title, setTitle] = useState(collectionTitle);
  const [description, setDescription] = useState(collectionDesc);
  const [imageUrl, setImageUrl] = useState(collectionImage);

  const handleReshuffle = () => {
    setImageUrl(getRandomCollectionImage());
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return {
    title,
    description,
    imageUrl,
    handleReshuffle,
    handleTitleChange,
    handleDescriptionChange,
  } as const;
};
