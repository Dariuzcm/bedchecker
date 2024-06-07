import axios from 'axios'
export const baseUrl = (import.meta.env.VITE_API_BASEURL || 'http://localhost:3333/') + 'api/v1/'
export default axios.create({
  baseURL: baseUrl,
});