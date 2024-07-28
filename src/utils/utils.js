import axios from 'axios';
export async function apiReq(
    endPoint,
    data,
    method,
    headers,
    requestOptions = {},
    isExternalApi = false
  ) {
    console.log('comming', endPoint, data);
    return new Promise(async (res, rej) => {
      if (!isExternalApi) {
        headers = {
          ...headers,
        };
      }
      if (method === 'get' || method === 'delete') {
        data = {
          ...requestOptions,
          ...data,
          headers,
        };
      }
      let finalConfig = { headers };
      if (method === 'get') {
        data = {
          ...data,
          // cancelToken,
        };
      } else if (method === 'post') {
        finalConfig = {
          headers,
          // cancelToken
        };
          console.log("🚀 ~ returnnewPromise ~ headers:", headers)
      }
      console.log({ finalConfig, endPoint, data });
      axios[method](endPoint, data, finalConfig)
        .then((result) => {
          console.log("🚀 ~ .then ~ result:", result)
          if (isExternalApi) {
            return res(result);
          }
          const { data } = result;
          console.log('🚀 ~ file: utils.js:174 ~ .then ~ data:', data);
          if (data.status === false) {
            return rej(data);
          }
          return res(data);
        })
        .catch((error) => {
          console.log('ALL_API_RESQUEST_DATA__CATCH', endPoint, error?.response);
         
          if (
            error &&
            error.response &&
            error.response.status === 401
          ) {
            // source.cancel();
            // NavigationService.resetNavigation();
            // NavigationService.navigate('loginUsingEmailScreen');
  
            return rej({
              message: error.response.data.message || 'Network Error',
            });
          }
          if (error && error.response && error.response.data) {
            if (!error.response.data.message) {
              return rej({
                ...error.response.data,
                msg: error.response.data.message || 'Network Error',
              });
            }
            return rej(error.response.data);
          }
          return rej({ message: 'Network Error', msg: 'Network Error' });
        });
    });
  }





export function apiPost(endPoint, data, headers = {}, isExternalApi = false) {
    console.log(data,'the heaer')
    return apiReq(endPoint, data, 'post', headers, {}, isExternalApi);
  }
  
  export function apiDelete(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers);
  }
  
  export function apiGet(endPoint, data, headers = {}, isExternalApi = false) {
    return apiReq(endPoint, data, 'get', headers, {}, isExternalApi);
  }
  
  export function apiPut(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'put', headers);
  }