import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Request, RequestVersion } from '../utils/request/request';

const listTemplateByCategory = (categoryId: number) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/template/list?page=0&size=9999&categoryId=${categoryId}`,
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
export const onGetTemplates = (
  onSuccess: () => void,
  onError: () => void,
  categoryId: number
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ['list-templates-by-category', categoryId],
    () => listTemplateByCategory(categoryId),
    {
      onSuccess,
      onError,
      enabled: !!categoryId,
    }
  );
};
