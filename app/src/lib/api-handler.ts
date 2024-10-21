import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const apiHandler = async (apiCall: () => Promise<Response | null>) => {
  const response = await apiCall();

  if (!response?.ok) {
    const error = await response?.json();

    if (error.code === 401) {
      toast.error('Sessão expirada, por favor faça login novamente');
      localStorage.removeItem('authToken');
      window.location.reload();
    }

    toast.error(`${error.code} - ${error.message}`);
  }

  return await response?.json();
};
