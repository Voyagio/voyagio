import axios from 'axios';

export const handleUser = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/v1/users/me`,
    { withCredentials: true }
  );

  return response.status;
};
