/*
 * @Author: DongZS
 * @Date: 2022-04-20 16:35:43
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\api\index.ts
 */
import http from '../http/index'

// 力导向图
export const getSideList = () => {
	return http.request({
		url: '/inter/getSideList',
		method: 'get'
	})
}
// 力导向图
export const getForceData = () => {
	return http.request({
		url: '/inter/getForce',
		method: 'get'
	})
}
// 柱状图
export const getBarData = () => {
	return http.request({
		url: '/inter/getBar',
		method: 'get'
	})
}
// 饼图
export const getPieData = () => {
	return http.request({
		url: '/inter/getPie',
		method: 'get'
	})
}
// 弦图
export const getChordData = () => {
	return http.request({
		url: '/inter/getChord',
		method: 'get'
	})
}
// 词云
export const getPointData = () => {
	return http.request({
		url: '/inter/getPoint',
		method: 'get'
	})
}
// 词云
export const getCloudData = () => {
	return http.request({
		url: '/inter/getCloud',
		method: 'get'
	})
}
// 中国地图
export const getChinaData = () => {
	return http.request({
		url: '/inter/getChina',
		method: 'get'
	})
}