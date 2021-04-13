import axios from 'axios';
import { SERVER_URL } from '../globals/url';

export const getMatches = () => {
  return axios.get(`http://betting2.ebslon.com/api/upcomingMatches`);
};
