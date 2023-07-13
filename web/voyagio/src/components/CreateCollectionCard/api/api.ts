import axios from 'axios';

export const postNewCollection = async (name: string, description: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/collections`,
    {
      name,
      description,
      image_url: '',
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};
