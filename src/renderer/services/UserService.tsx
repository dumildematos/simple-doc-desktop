import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Request, RequestVersion } from '../utils/request/request';

const loginUserRequest = (loginForm: LoginForm) => {
  return Request({ url: '/login', method: 'POST', data: loginForm });
};

const getCurrentUser = (token) => {
  return Request({
    url: `/${RequestVersion}/user/me`,
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

export const getUserDataService = (
  onDetailSuccess: () => void,
  onError: () => void,
  token: string | null,
  login: any
) => {
  // console.log(token)
  console.log(login)
  return useQuery(['detail-user', login], () => getCurrentUser(token), {
    onSuccess: onDetailSuccess,
    onError,
    enabled: login?.data.status === 200,
    refetchInterval: 1000,
  });
};
