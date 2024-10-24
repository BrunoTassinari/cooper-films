'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type jwtDecoded = {
  validUser: {
    id: string;
    role: string;
  };
};

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      toast.clearWaitingQueue();
      toast.error('Faça login para acessar a página');
      router.push('/login');
    } else {
      const decodedToken = jwtDecode<jwtDecoded>(token);

      setRole(decodedToken.validUser.role);
      setUserId(decodedToken.validUser.id);

      setAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  return { loading, authenticated, role, userId };
};
