import axios from 'axios';
import { SERVER_URL } from '../globals/url';

export const getBanner = () => {
  return axios.get(`${SERVER_URL}/banner`);
};
