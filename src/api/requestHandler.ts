import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL+'api/v1/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});