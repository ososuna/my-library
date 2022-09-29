import axios from 'axios';

const userApi = axios.create({
  baseURL: `${ import.meta.env.VITE_API_URI }/user`
});

export default userApi;
