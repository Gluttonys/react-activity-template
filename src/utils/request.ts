import { extend, RequestOptionsInit } from 'umi-request';
import { getQueryObj } from '@/utils/index';

import Toast from 'react-simple-toasts';
import { ERROR_MESSAGE } from '@/constantPool';

const request = extend({
  prefix: process.env.REQUEST_BASE_URL,
  timeout: 1e3 * 5,
  timeoutMessage: ERROR_MESSAGE,
  useCache: false,
  ttl: 1e3 * 2,
  maxCache: 0,
  parseResponse: true,
});

type interceptorType = {
  url?: string;
  options?: RequestOptionsInit;
};

/* 请求拦截器 */
request.interceptors.request.use(
  (url: string, options: RequestOptionsInit): interceptorType => {
    /* 携带 token 等 */
    const { token } = getQueryObj();

    return {
      options: {
        ...options,
        headers: {
          token,
        },
      },
    };
  },
);

/* 响应拦截器 */
request.interceptors.response.use(
  async (
    response: Response,
    options: RequestOptionsInit,
  ): Promise<Response> => {
    const data = await response.clone().json();
    const { code, message } = data;
    if (code !== 200) {
      Toast(message);
      return Promise.reject(data);
    }
    return response;
  },
);

export default request;
