import axios from 'axios';

export default function initAxios() {
  axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
}
