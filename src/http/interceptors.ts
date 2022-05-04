/*
 * @Author: DongZS
 * @Date: 2022-04-20 15:51:33
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\http\interceptors.ts
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
	setToken,
	setRefreshToken,
	getToken,
	getTokenKey,
	getRefreshToken,
	getRefreshTokenKey,
	removeToken,
} from "../plugins/cookie";

export class Interceptors {
	instance: AxiosInstance;
	constructor() {
		this.instance = axios.create({
			baseURL: 'http://127.0.0.1:8080',
			timeout: 10000
		})
		this.init()
	}
	// 初始化拦截器
	init() {
		// 请求接口拦截器
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// 判断一下是否有cookie 如果有的话则把cookie放入请求头中
				if (getToken()) {
					config.headers![getTokenKey()] = getToken() || '';
					config.headers![getRefreshTokenKey()] = getRefreshToken() || '';
				}
				return config;
			},
			(err: any) => {
				console.error(err);
			}
		);

		// 响应拦截器
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const res = response.data;
				if (res.code !== 0) {
					if (res.code === -3) {
						console.error("登录过期");
						removeToken();
					} else {
						if (res.msg) {
							console.error(res.msg);
						}
					}
					return Promise.resolve(res);
				} else {
					// 返回成功则把token存储一下
					const headers = response.headers;
					const token = headers.token;
					const refresh_token = headers["refresh-token"];
					if (token && refresh_token) {
						setToken(token);
						setRefreshToken(refresh_token);
					}
					return res;
				}
			},
			(error: any) => {
				if (error.message === "Request failed with status code 500") {
					console.error("系统错误，请检查API是否正常！");
					return;
				}
				let code = -110;
				if (error && error.response && error.response.status) {
					code = error.response.status;
					// 登陆过期
					if (code === 401 || code === -3) {
						removeToken();
					}
				} else {
					console.error(error.message);
				}
				const err = { errCode: -110, errMsg: error.message || "Error" };
				return Promise.resolve(err);
			}
		);
	}
	// 返回一下
	getInterceptors() {
		return this.instance;
	}
}