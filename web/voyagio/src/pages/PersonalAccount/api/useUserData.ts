import { useEffect, useState } from 'react';
import {
  CollectionDTO,
  FavouriteDTO,
  UserCredentials,
  getFavourites,
  getUserCollections,
  getUserCredentials,
} from './api';

export const useUserData = () => {
  const [favourites, setFavourites] = useState<FavouriteDTO[]>([]);
  const [collections, setCollections] = useState<CollectionDTO[]>([]);
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    id: '',
    email: '',
  });

  const fetchFavourites = async () => {
    setFavourites(await getFavourites());
  };

  const fetchCollections = async () => {
    setCollections(await getUserCollections());
  };

  const fetchUserCredentials = async () => {
    setUserCredentials(await getUserCredentials());
  };

  const fetchUserData = async () => {
    await Promise.all([
      fetchFavourites(),
      fetchCollections(),
      fetchUserCredentials(),
    ]);
  };

  useEffect(() => {
    fetchUserData().then();
  }, []);

  return { favourites, collections, userCredentials, fetchUserData } as const;
};
