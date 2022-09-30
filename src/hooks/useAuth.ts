import axios from 'axios';
import LoginRequest from '../models/LoginRequest';
import authApi from '../api/authApi';
import { useRouter } from 'vue-router';

export const useAuth = () => {
  
  const router = useRouter();

  const login = async( request: LoginRequest ) => {
    try {
      await authApi.post( '/login', request );
      return { ok: true, message: 'Login successful' };
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'Ha ocurrido un error';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'Ha ocurrido un error' };
      }
    }
  }

  const logout = () => {
    router.push({ name: 'auth' });
  }

  return {
    login,
    logout
  }
}
