import axios from 'axios';

export const getRandomCollectionImage = () => {
  const randomNum = Math.floor(Math.random() * 4) + 1;
  return `https://raw.githubusercontent.com/Voyagio/voyagio/main/static/collection_${randomNum}.svg`;
};

export const postNewCollection = async (name: string, description: string, image_url: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/collections`,
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
