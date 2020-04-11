import axios, {AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse} from "axios";

export class HttpRequest {
  constructor(public baseUrl: string, public timeout: number) {
    this.baseUrl = baseUrl
    this.timeout = timeout
  }

  //配置合并
  private mergeConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    config = Object.assign({
      baseURL: this.baseUrl,
      timeout: this.timeout,
    }, config)
    return config
  }

  //拦截器
  private interceptors(instance: AxiosInstance, url?: string) {

    //请求拦截
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
        return config
      },
      error => {
        if (error.response.status == 'token失效状态码') {
          location.href = '/login'
        } else {
          return Promise.reject(error)
        }
      })

    //响应拦截
    instance.interceptors.response.use((res: AxiosResponse) => {
        return res
      },
      error => {
        return Promise.reject(error)
      })
  }

  public request(config: AxiosRequestConfig): AxiosPromise {
    const app: AxiosInstance = axios.create()
    config = this.mergeConfig(config)
    this.interceptors(app, config.url)
    return app(config)
  }
}
