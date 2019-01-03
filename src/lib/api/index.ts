import axios from 'axios';
import * as workApi from './workApi';

const { API_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export {
  axiosInstance,
  workApi,
};
