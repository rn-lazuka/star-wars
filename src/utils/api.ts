import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const API: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
});

export const setHeaders = (
  headers: { [key: string]: string },
  axiosInstance: AxiosInstance = API,
  fireEvent = true,
) => {
  const commonHeaders = { ...axiosInstance.defaults.headers.common };

  Object.keys(headers).forEach((key) => (commonHeaders[key] = headers[key]));

  if (fireEvent) {
    window.dispatchEvent(new CustomEvent('SET_HEADERS', { detail: headers }));
  }

  axiosInstance.defaults.headers.common = commonHeaders;
};

export const deleteHeaders = (
  headerKeys: string[],
  axiosInstance: AxiosInstance = API,
) => {
  const commonHeaders = { ...axiosInstance.defaults.headers.common };

  headerKeys.forEach((key) => commonHeaders[key] && delete commonHeaders[key]);

  axiosInstance.defaults.headers.common = commonHeaders;
};
