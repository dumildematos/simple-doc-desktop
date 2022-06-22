import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TeamAddForm } from 'renderer/models/TeamModel';
import { Request, RequestVersion } from '../utils/request/request';

const listCategory = () => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/category/list/?page=0&size=99999`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const onListCategory = (
  onSuccess: () => void,
  onError: () => void,
  enabled: boolean
) => {
  return useQuery('list-category', listCategory, {
    onSuccess,
    onError,
    enabled,
    // refetchInterval: 1000,
  });
};
