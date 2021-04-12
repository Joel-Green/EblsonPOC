import axios from 'axios';
import { SERVER_URL } from '../globals/url';
import EncryptedStorage from 'react-native-encrypted-storage';

export const login = obj => {
  return axios.post(`${SERVER_URL}/login`, obj);
};

export const storeUserJwt = jwt => {
  return EncryptedStorage.setItem('user_jwt', jwt);
};

export const getUserJwt = () => {
  return EncryptedStorage.getItem('user_jwt');
};

export const removeUserJwt = () => {
  return EncryptedStorage.removeItem('user_jwt');
};
