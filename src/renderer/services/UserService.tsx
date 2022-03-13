import { useQuery, useMutation } from 'react-query';
import { Request } from 'renderer/utils/request/request';

const loginUserRequest = (loginForm: LoginForm) => {
  return Request({ url: '/login', method: 'POST', data: loginForm });
};

const version = 'v1';

const getCurrentUser = (token) => {
  console.log(token)
  return Request({
    url: `/${version}/user/me`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
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

export const getUserData = (onSuccess, onError, token) => {
  // console.log(token)
  return useQuery('detail-user', () => getCurrentUser(token), {
    onSuccess,
    onError,
    // refetchInterval: 2000,
  });
};
