import axios from 'axios';
import { startMocking } from '@/mock/server';

export default function initAxios() {
  if (process.env.VUE_APP_MOCKING === 'true') {
    startMocking();
  } else {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
  }
}
