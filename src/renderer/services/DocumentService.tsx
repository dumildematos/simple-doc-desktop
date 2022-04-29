import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  AddContributorForm,
  CreateDocument,
} from 'renderer/models/DocumentModel';
import { Request, RequestVersion } from '../utils/request/request';

const createDocument = (data: CreateDocument) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/document/create`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const addContributor = (data: AddContributorForm) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/document/add/contributor`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteDocumentRequest = (data: any) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/document/${data.docId}/${data.teamId}`,
    method: 'DELETE',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const listDcomentsByTeam = (teamId: number) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/team/document/list?page=0&size=20&teamId=${teamId}`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDocumentsOfTeam = (
  onSuccess: () => void,
  onError: () => void,
  teamId: number
) => {
  return useQuery('list-teams-document', () => listDcomentsByTeam(teamId), {
    onSuccess,
    onError,
    // refetchInterval: 1000,
  });
};

export const onCreateDocument = (
  onSuccess: () => void,
  onError: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createDocument, {
    onSuccess,
    onError,
  });
};

export const onAddContributor = (
  onSuccess: () => void,
  onError: () => void
) => {
  return useMutation(addContributor, {
    onSuccess,
    onError,
  });
};

export const onDeleteDocument = (onSuccess: () => void, onError: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(deleteDocumentRequest, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-teams-document');
      const previousTeamList = queryClient.getQueryData('list-teams-document');
      queryClient.setQueryData('list-teams-document', (oldQueryData) => {
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
