import axios from 'axios';
import bookApi from '../api/bookApi';

export const useBook = () => {
  const getBooks = async() => {
    try {
      const { data } = await bookApi.get('/all');
      return { ok: true, data };
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has occurred' };
      }
    }
  }

  return {
    getBooks
  }
}
