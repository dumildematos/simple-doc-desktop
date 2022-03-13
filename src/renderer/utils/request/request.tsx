import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:8080/api' });

const accessToken = localStorage.getItem('access_token');
export const Request = ({ ...options }) => {

  client.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (accessToken) {
    client.defaults.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + accessToken
    }
  }

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
