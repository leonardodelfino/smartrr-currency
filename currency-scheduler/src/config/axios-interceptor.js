// interceptor.js

import axios from 'axios';

class AxiosInterceptor {
  constructor() {
    if (!AxiosInterceptor.instance) {
      this.initializeInterceptor();
      AxiosInterceptor.instance = this;
    }

    return AxiosInterceptor.instance;
  }

  initializeInterceptor() {
    const api = axios.create({
      baseURL: 'https://example.com',
    });

    api.interceptors.request.use(
      (config) => {
        // Modify the request configuration here
        return config;
      },
      (error) => {
        // Handle request errors here
        return Promise.reject(error);
      }
    );
  }
}

const interceptor = new AxiosInterceptor();

export default interceptor;
