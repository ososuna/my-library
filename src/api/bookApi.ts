import axios from 'axios';

const bookApi = axios.create({
  baseURL: `${ import.meta.env.VITE_API_URI }/book`
});

export default bookApi;
