import { createContext } from 'react';

type CollectionContextType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const CollectionContext = createContext<CollectionContextType>({
  id: '',
  title: '',
  description: '',
  imageUrl: '',
});
