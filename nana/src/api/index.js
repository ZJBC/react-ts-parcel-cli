/**
 * @author yurt
 * @date 2018-6-6 11:21
 */

import Axios from 'axios'
import Qs from "qs";

/**
 * 参数预处理
 */
let filterNull = param => {
  
  if (toType(param) === 'object') {
    let keys = Object.keys(param);
    
    for (let k in keys) {
      if (param[k] === null) {
        delete param[k];
        return;
      }
      let currentType = toType(param[k]);
      switch (currentType) {
        case 'string':
          param[k] = param[k].trim();
          break;
        case 'object':
          param[k] = filterNull(param[k]);
          break;
        case 'array':
          param[k] = filterNull(param[k]);
          break;
        default:
          break;
      }
    }
  }
  return param;
};

/**
 * 自定义判断元素类型JS
 */
let toType = obj => Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

/**
 * 获取url根地址
 */
let getRoot = _ => window.location.href.split('/').slice(0, 3).join('/');

/**
 * axios二次封装
 *
 * @param method   请求方式（GET，POST，PUT，DELETE）
 * @param url      请求地址（相对地址）
 * @param params   请求参数
 *
 * @returns {Promise}  Axios返回的的Promise
 */
let apiAxios = (method, url, params) => {
  // 参数预处理
  if (params) {
    params = filterNull(params)
  }
  
  //返回Promise对象
  let fff = {
    url: url,
    method: method,
    baseURL: getRoot(),
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    headers: {},
    transformRequest: [params => {
      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      // 也可以去掉
      params = Qs.stringify(params);
      return params;
    }]
  };
  return Axios(fff);
};

export default {
  /**
   * [get description]
   */
  get: function (url, params) {
    return apiAxios('GET', url, params);
  },
  /**
   * [post description]
   */
  post: function (url, params) {
    debugger;
    return apiAxios('POST', url, params);
  },
  /**
   * [put description]
   */
  put: function (url, params) {
    return apiAxios('PUT', url, params);
  },
  /**
   * [delete description]
   */
  delete: function (url, params) {
    return apiAxios('DELETE', url, params);
  },
  /**
   * axios对象
   */
  axios: Axios
}
