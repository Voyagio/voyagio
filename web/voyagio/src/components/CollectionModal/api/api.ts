import axios from 'axios';

export const patchCollectionInfo = async (
  collectionId: string,
  name: string,
  description: string,
  image_url: string
) => {
  const res = await axios.patch(
    `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}`,
    {
      name,
      description,
      image_url,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const saveRecommendation = async (collectionId: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/collections/${collectionId}/save`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};
