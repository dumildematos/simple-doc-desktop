import { useQuery , useMutation , useQueryClient } from 'react-query';
import { Request } from 'renderer/utils/request/request';

const loginUserRequest = (loginForm: LoginForm) => {
  return Request({ url: '/login', method: 'POST', data: loginForm });
}


export const UserLoginService = (onSuccess, onError) => {
  return useMutation(loginUserRequest, {
    onSuccess,
    onError,
  });
};
