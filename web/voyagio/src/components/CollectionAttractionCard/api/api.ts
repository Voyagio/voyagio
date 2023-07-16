import axios from 'axios';

export const removePlace = (collectionId: string, placeId: string) => axios.delete(
  `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/places/`,
  {
    withCredentials: true,
    data: { place_id: placeId },
  },
);
