import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ExternalRequest } from '../utils/request/request';


const listCountries = () => {
  return ExternalRequest({
    url: `restcountries.com/v3.1/all`,
    method: 'GET',
    data: null,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const onListCoutries = (onSuccess: () => void, onError: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery('list-country', listCountries, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
};
