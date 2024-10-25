import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const request = axios.create({
  baseURL: isProduction
    ? 'https://api.gopizza.kr'
    : 'https://dev.api.gopizza.kr',
});

request.interceptors.response.use(response => {
  if (response.data.code && response.data.code !== '0000') {
    /* eslint-disable no-throw-literal */
    throw {
      code: response?.data?.code,
      message: response.data.message,
      response,
    };
  }

  return response;
});

export default request;
