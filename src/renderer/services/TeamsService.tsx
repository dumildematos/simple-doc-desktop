import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Request, RequestVersion } from '../utils/request/request';

const listTeamsRequest = (token) => {
  return Request({
    url: `/${RequestVersion}/teams/user/?page=0&size=6`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const getUserTeams = (
  onSuccess: () => void,
  onError: () => void,
  token: string | null
) => {
  return useQuery(['list-user-teams'], () => listTeamsRequest(token), {
    onSuccess,
    onError,
    // refetchInterval: 1000,
  });
};
