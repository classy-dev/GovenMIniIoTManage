import axios, { AxiosError, AxiosResponse } from 'axios';

const request = axios.create({
  baseURL: 'https://dev.api.gopizza.kr',
});

export default request;
