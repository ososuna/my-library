import axios from 'axios';

const authApi = axios.create({
  baseURL: `${ import.meta.env.VITE_API_URI }/user`
});

export default authApi;
