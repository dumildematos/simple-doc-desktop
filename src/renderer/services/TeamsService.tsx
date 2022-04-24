import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { Request, RequestVersion } from '../utils/request/request';

const listTeamsRequest = (page: number, name: string | null) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/teams/user?page=${
      page === 1 ? 0 : page - 1
    }&size=6&name=${name === undefined ? '' : name}`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};
const listInvitedTeamsRequest = (page: number, name: string | null) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/teams/user/invited?page=${
      page === 1 ? 0 : page - 1
    }&size=6&name=${!name ? '' : name}`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const listPublicTeamRequest = (page: number, name: string | null) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/teams/public?page=${
      page === 1 ? 0 : page - 1
    }&size=6&name=${!name ? '' : name}`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTeamRequest = (id: number) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/team/${id}`,
    method: 'DELETE',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const editTeamRequest = (data: TeamAddForm) => {
  const token = localStorage.getItem('access_token');
  const team: TeamAddForm = {
    name: data.name,
    description: data.description,
    banner: data.banner,
    type: data.type,
  };
  return Request({
    url: `/${RequestVersion}/team/${data.id}`,
    method: 'PUT',
    data: team,
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
  page: number,
  name: string | null
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ['list-user-teams', page, name],
    () => listTeamsRequest(page, name),
    {
      onSuccess,
      onError,
      // refetchInterval: 1000,
    }
  );
};
export const getUserInvitedTeams = (
  onSuccess: () => void,
  onError: () => void,
  page: number,
  name: string | null
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ['list-user-invited-teams', page, name],
    () => listInvitedTeamsRequest(page, name),
    {
      onSuccess,
      onError,
      // refetchInterval: 1000,
    }
  );
};
export const onListPublicTeams = (
  onSuccess: () => void,
  onError: () => void,
  page: number,
  name: string | null
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ['list-user-public-teams', page, name],
    () => listPublicTeamRequest(page, name),
    {
      onSuccess,
      onError,
    }
  );
};

export const onCreateTeam = (onSuccess: () => void, onError: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

export const onEditTeam = (onSuccess: () => void, onError: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(editTeamRequest, {
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

export const onDeleteTeam = (onSuccess: () => void, onError: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(deleteTeamRequest, {
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
