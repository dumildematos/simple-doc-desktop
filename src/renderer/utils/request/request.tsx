import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:8080/api' });

export const Request = ({ ...options }) => {
  // client.defaults.headers.common.Authiorization = `Bearer Token`;
  // client.defaults.headers.post['Content-Type'] = 'application/json';
  client.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  }
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
