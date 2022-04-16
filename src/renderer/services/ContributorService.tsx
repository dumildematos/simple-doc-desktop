import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Request, RequestVersion } from '../utils/request/request';

const listContributorRequest = (docId: number) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/contributors/${docId}`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteContributorRequest = (data: any) => {
  const token = localStorage.getItem('access_token');
  return Request({
    url: `/${RequestVersion}/contributor/${data.contrId}/${data.docId}`,
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
export const onListDocumentContributor = (
  onSuccess: () => void,
  onError: () => void,
  docId: number
) => {
  return useQuery(
    'list-document-contributors',
    () => listContributorRequest(docId),
    {
      onSuccess,
      onError,
      // refetchInterval: 1000,
    }
  );
};

export const onDeleteDocumentContributor = (
  onSuccess: () => void,
  onError: () => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(deleteContributorRequest, {
    onMutate: async (newteam) => {
      await queryClient.cancelQueries('list-document-contributors');
      const previousTeamList = queryClient.getQueryData(
        'list-document-contributors'
      );
      queryClient.setQueryData('list-document-contributors', (oldQueryData) => {
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
