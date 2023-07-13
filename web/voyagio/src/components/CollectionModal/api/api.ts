import axios from 'axios';

export const patchCollectionInfo = async (
  collectionId: string,
  name: string,
  description: string,
  image_url = ''
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
