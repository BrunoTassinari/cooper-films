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

    throw new Error(`${error.code} - ${error.message}`);
  }

  if (response.status === 204) return null;

  return response.json();
};
