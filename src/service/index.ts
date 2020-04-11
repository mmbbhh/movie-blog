import { HttpRequest } from "./config";

const api = {
  devApiBaseUrl: 'http://127.0.0.1:5000/',
  proApiBaseUrl: 'http://sora.wintoo.io:5000/',
}

//判断环境确定api
const apiBaseUrl = process.env.NODE_ENV === 'production' ? api.proApiBaseUrl : api.devApiBaseUrl;

export const httpRequest = new HttpRequest(apiBaseUrl, 5000)
