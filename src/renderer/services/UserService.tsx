import { useQuery , useMutation  } from 'react-query';
import { Request } from 'renderer/utils/request/request';

const loginUserRequest = (loginForm: LoginForm) => {
  return Request({ url: '/login', method: 'POST', data: loginForm });
};

const version = 'v1';

const getCurrentUser = () => {
  return Request({ url: `/${version}/user/me`, method: 'GET', data: null });
};

export const UserLoginService = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation(loginUserRequest, {
    onSuccess,
    onError,
  });
};

export const getUserData = (onSuccess, onError) => {
  return useQuery('detail-user', getCurrentUser, {
    onSuccess,
    onError,
  });
};
