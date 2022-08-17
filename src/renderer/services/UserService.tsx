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
const userUpdateRequest = (registrationForm: UserRegistrationModel) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/user/edit`,
    method: 'PUT',
    data: registrationForm,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    }
  });
};

const userChangePasswordRequest = (registrationForm: UserRegistrationModel) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/user/change-password`,
    method: 'PUT',
    data: registrationForm,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    }
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

const getUserActivity = () => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/user/activity`,
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

export const onUpdateUserService = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(userUpdateRequest, {
    onSuccess,
    onError,
  });
};
export const onChangePasswordUserService = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(userChangePasswordRequest, {
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

export const onGetUserActivityService = (
  onSuccess: () => void,
  onError: () => void,
) => {
  // console.log(token)
  return useQuery(['user-activity'], () => getUserActivity(), {
    onSuccess,
    onError,
    refetchInterval: 1000,
    staleTime: 1000,
    enabled: false
  });
};
