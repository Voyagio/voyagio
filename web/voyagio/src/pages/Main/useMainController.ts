import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { handleUser } from './handleUser';

export const useMainController = (page: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleUser()
      .then(() => navigate(page))
      .catch(() => navigate('/login'));
  }, []);
};
