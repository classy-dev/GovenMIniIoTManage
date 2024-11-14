import axios from 'axios';

// const isProduction = process.env.NODE_ENV === 'production';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
