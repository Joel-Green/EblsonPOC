import Toast from 'react-native-toast-message';

export const showToast = (options = {}) => {
  Toast.show({
    position: 'bottom',
    ...options,
  });
};
