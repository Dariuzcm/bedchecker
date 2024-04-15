import axios from 'axios'

export default axios.create({
  baseURL: (import.meta.env.VITE_API_BASEURL || 'http://localhost:3333/' )+'api/v1/',
});