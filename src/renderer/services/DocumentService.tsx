import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CreateDocument } from 'renderer/models/DocumentModel';
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

const listDcomentsByTeam = (teamId: number) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/team/document/list?page=0&size=3&teamId=${teamId}`,
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
  teamId: number,
) => {
  return useQuery('list-teams-document', () => listDcomentsByTeam(teamId), {
    onSuccess,
    onError,
    // refetchInterval: 1000,
  });
};

export const onCreateDocument = (
  onCreateSuccess: (data: any) => void,
  onCreateError: (error: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation(createDocument, {
    onSuccess: () => onCreateSuccess,
    onError: () => onCreateError,
  });
};
