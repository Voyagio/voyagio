import axios from 'axios';

export const removePlace = (collectionId: string, placeId: string) => {
  return axios.delete(
    `${
      import.meta.env.VITE_API_URL
    }/v1/collections/${collectionId}/places/${placeId}`,
    {
      withCredentials: true,
      data: {
        placeId: placeId,
      },
    }
  );
};
