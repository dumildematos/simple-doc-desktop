import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:8080/api' });

export const Request = ({ ...options }) => {
  const accessToken = localStorage.getItem('access_token');

  client.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
