import axios from 'axios';
import { SERVER_URL } from '../globals/url';

export const upcomingMatches = () => {
  return axios.get(`${SERVER_URL}/upcomingMatches`);
};
