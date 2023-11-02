import { generateToken, handleLocalStorage } from '@/utils/utils';
import { LS_KEY } from '../config';

export const makeAuthRequest = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const accessToken = generateToken(username);
      resolve(accessToken);
    }, 1000);
  });
};

export const logOutRequest = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      handleLocalStorage.delete(LS_KEY.token);
      resolve();
    }, 1000);
  });
};
