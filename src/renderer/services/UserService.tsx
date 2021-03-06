import { useQuery, useMutation, useQueryClient } from 'react-query';
import { LoginForm, UserRegistrationModel } from 'renderer/models/UserModels';
import { Request, RequestVersion } from '../utils/request/request';

const loginUserRequest = (loginForm: LoginForm) => {
  return Request({ url: '/login', method: 'POST', data: loginForm });
};

const userRegistrationRequest = (registrationForm: UserRegistrationModel) => {
  return Request({
    url: `/${RequestVersion}/user/register`,
    method: 'POST',
    data: registrationForm,
  });
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

export const onRegistUser = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(userRegistrationRequest, {
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
