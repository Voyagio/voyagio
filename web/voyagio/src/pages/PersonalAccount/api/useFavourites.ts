import { useEffect, useState } from 'react';
import { FavouriteDTO, getFavourites } from './api';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<FavouriteDTO[]>([]);

  const fetchFavourites = async () => {
    setFavourites(await getFavourites());
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return { favourites, fetchFavourites } as const;
};
