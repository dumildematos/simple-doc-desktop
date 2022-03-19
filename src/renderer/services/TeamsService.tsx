import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TeamAdd } from 'renderer/models/TeamModel';
import { Request, RequestVersion } from '../utils/request/request';

const listTeamsRequest = (token: any) => {
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

const createTeam = (data: TeamAdd, token: string) => {
  return Request({
    url: `/${RequestVersion}/teams/user/?page=0&size=6`,
    method: 'POST',
    data,
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

export const onCreateTeam = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  form: TeamAdd,
  token: string
) => {
  return useMutation(
    () => {
      createTeam(form, token);
    },
    {
      onSuccess,
      onError,
      disable: true,
    }
  );
};
