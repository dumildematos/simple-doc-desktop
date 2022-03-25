import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { Request, RequestVersion } from '../utils/request/request';

const listTeamsRequest = (page: number) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/teams/user/?page=${
      page === 1 ? 0 : page - 1
    }&size=6`,
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
  page: number
) => {
  return useQuery(['list-user-teams', page], () => listTeamsRequest(page), {
    onSuccess,
    onError,
    // refetchInterval: 1000,
  });
};

export const onCreateTeam = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(createTeam, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-user-teams');
      const previousTeamList = queryClient.getQueryData('list-user-teams');
      queryClient.setQueryData('list-user-teams', (oldQueryData) => {
        console.log(oldQueryData, newteam);
        // return {
        //   ...oldQueryData,
        //   data: [...oldQueryData.data, newteam],
        // };
      });
      return {
        previousTeamList,
      };
    },
    onSuccess,
    onError,
  });
};
