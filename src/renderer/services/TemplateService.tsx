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

const listUserTemplatesRequest = (param: any) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/template/me/list?page=${
      param.page === 1 ? 0 : param.page - 1
    }&size=${param.size}&name=${!param.name ? '' : param.name}`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const createTemplateRequest = (data: any) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/template/create`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateTemplateRequest = (data: any) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/template/${data.id}`,
    method: 'PUT',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTemplate = (id: any) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/template/${id}`,
    method: 'DELETE',
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

export const onGetUserTemplates = (
  onSuccess: () => void,
  onError: () => void,
  params: any
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ['list-user-templates', params],
    () => listUserTemplatesRequest(params),
    {
      onSuccess,
      onError,
    }
  );
};

export const onCreateTemplate = (
  onSuccess: () => void,
  onError: () => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(createTemplateRequest, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-user-templates');
      const previousTeamList = queryClient.getQueryData('list-user-templates');
      queryClient.setQueryData('list-user-templatess', (oldQueryData) => {
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

export const onEditTemplate = (onSuccess: () => void, onError: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(updateTemplateRequest, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-user-templates');
      const previousTeamList = queryClient.getQueryData('list-user-templates');
      queryClient.setQueryData('list-user-templatess', (oldQueryData) => {
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

export const onDeleteTemplate = (
  onSuccess: () => void,
  onError: () => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(deleteTemplate, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-user-templates');
      const previousTeamList = queryClient.getQueryData('list-user-templates');
      queryClient.setQueryData('list-user-templatess', (oldQueryData) => {
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
