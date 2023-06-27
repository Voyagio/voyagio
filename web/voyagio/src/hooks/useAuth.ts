import axios from 'axios';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + '/users/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      navigate('/search');
    } else {
      console.log('Login failed');
    }
  };

  const handleSignup = async (email: string, password: string) => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + '/users/signup',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      navigate('/search');
    } else {
      console.log('Signup failed');
    }
  };

  return {
    handleLogin,
    handleSignup,
  };
};
