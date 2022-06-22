import axios from 'axios';

const springBootClient = axios.create({ baseURL: 'http://localhost:8080/api' });
const mongoClient = axios.create({ baseURL: 'http://localhost:8002' });
const externalClient = axios.create({ baseURL: 'https://' });

export const Request = ({ ...options }) => {
  springBootClient.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };

  return springBootClient(options).then(onSuccess).catch(onError);
};

export const RequestMongo = ({ ...options }) => {
  mongoClient.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };

  return mongoClient(options).then(onSuccess).catch(onError);
};

export const ExternalRequest = ({ ...options }) => {
  mongoClient.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };

  return externalClient(options).then(onSuccess).catch(onError);
};

export const RequestVersion = 'v1';
