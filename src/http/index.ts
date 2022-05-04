/*
 * @Author: DongZS
 * @Date: 2022-04-20 16:19:16
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\http\index.ts
 */
import { AxiosPromise, AxiosResponse } from "axios";
import { Interceptors } from "./interceptors";

// 请求配置
export class HttpServer {
  axios: any;
  // 获取axios实例
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
  // 简单封装一下方法
  request(config: any): AxiosPromise {
    return new Promise((resolve, reject) => {
      this.axios(config).then((res: AxiosResponse) => {
        resolve(res);
      }).catch((err: any) => {
        reject(err)
      });
    });
  }
}

const http = new HttpServer()

export default http