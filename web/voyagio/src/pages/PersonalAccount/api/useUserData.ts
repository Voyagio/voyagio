import { useEffect, useState } from 'react';
import {
  CollectionDTO,
  FavouriteDTO,
  getFavourites,
  getUserCollections,
} from './api';

export const useUserData = () => {
  const [favourites, setFavourites] = useState<FavouriteDTO[]>([]);
  const [collections, setCollections] = useState<CollectionDTO[]>([]);

  const fetchFavourites = async () => {
    setFavourites(await getFavourites());
  };

  const fetchCollections = async () => {
    setCollections(await getUserCollections());
  };

  const fetchUserData = async () => {
    await Promise.all([fetchFavourites(), fetchCollections()]);
  };

  useEffect(() => {
    fetchUserData().then();
  }, []);

  return { favourites, collections, fetchUserData } as const;
};
