import axios from 'axios';
import { SERVER_URL } from '../globals/url';

export const getBanner = () => {
  return axios.get(`http://betting2.ebslon.com/api/banner`);
};
