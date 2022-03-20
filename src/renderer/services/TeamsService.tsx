import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { Request, RequestVersion } from '../utils/request/request';

const listTeamsRequest = () => {
  const token = localStorage.getItem('access_token');
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

const createTeam = (data: TeamAddForm) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/team/create`,
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
  return useQuery('list-user-teams', listTeamsRequest, {
    onSuccess,
    onError,
    // refetchInterval: 1000,
  });
};

export const onCreateTeam = (
  onCreateSuccess: (data: any) => void,
  onCreateError: (error: any) => void
  ) => {
  const queryClient = useQueryClient();
  return useMutation(createTeam, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-user-teams');
      const previousTeamList = queryClient.getQueryData('list-user-teams');
      queryClient.setQueryData('list-user-teams', (oldQueryData) => {
        console.log(oldQueryData);
        // return {
        //   ...oldQueryData,
        //   data: [...oldQueryData.data, newteam],
        // };
      });
      return {
        previousTeamList,
      };
    },
    onSuccess: () => onCreateSuccess,
    onError: () => onCreateError,
  });
};
