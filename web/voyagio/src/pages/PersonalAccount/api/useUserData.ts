import { useEffect, useState } from 'react';
import {
  CollectionDTO,
  FavoriteDTO,
  UserCredentials,
  getFavorites,
  getUserCollections,
  getUserCredentials,
} from './api';

export const useUserData = () => {
  const [favorites, setFavorites] = useState<FavoriteDTO[]>([]);
  const [collections, setCollections] = useState<CollectionDTO[]>([]);
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    id: '',
    email: '',
  });

  const fetchFavorites = async () => {
    setFavorites(await getFavorites());
  };

  const fetchCollections = async () => {
    setCollections(await getUserCollections());
  };

  const fetchUserCredentials = async () => {
    setUserCredentials(await getUserCredentials());
  };

  const fetchUserData = async () => {
    await Promise.allSettled([
      fetchFavorites(),
      fetchCollections(),
      fetchUserCredentials(),
    ]);
  };

  useEffect(() => {
    fetchUserData().then();
  }, []);

  return {
    favorites,
    collections,
    userCredentials,
    fetchUserData,
    fetchFavorites,
  } as const;
};
