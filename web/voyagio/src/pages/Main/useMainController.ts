import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useMainController = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);
};
