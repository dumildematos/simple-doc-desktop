import axios from 'axios';

const springBootClient = axios.create({
  baseURL: "https://web-production-d10f.up.railway.app/api", //'http://localhost:8080/api', // 'https://simpledoc-io.herokuapp.com/api',
});
const mongoClient = axios.create({
  baseURL: "https://web-production-fd1f.up.railway.app/" , //'https://localhost:8002', // 'https://simpledoc-node-api.herokuapp.com',
});

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
