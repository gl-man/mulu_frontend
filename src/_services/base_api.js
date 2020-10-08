import axios from 'axios';
import config from 'config';

export default axios.create({
  baseURL: config.BASE_URL,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
});
