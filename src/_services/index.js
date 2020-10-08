import { auth } from '_helpers';
import api from './base_api';
import userService from './user.service';

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent, like we're inserting a autherization header
    // authorization header with custom auth credentials
    let authToken = auth.get().token;
    if (authToken) {
      config.Authorization = 'Custom ' + authToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.error(error);
    return Promise.reject(error.request.statusText || 'Error on Request');
  }
);

api.interceptors.response.use(
  function (response) {
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    if (!response.data.success) {
      return Promise.reject(!response.data.success ? response.data.message : "Can't find data");
    }
    return Promise.reject("Can't find data");
  },
  function (error) {
    // Do something with response error
    console.error(error);
    if (error.response.status === 401) {
      userService.logout();
      window.location.reload(true);
    }
    return Promise.reject(
      error.response.data ? error.response.statusText : error.response.data.message || ''
    );
  }
);

export { default as userService } from './user.service';
