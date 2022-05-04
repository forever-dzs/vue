/*
 * @Author: DongZS
 * @Date: 2022-04-13 18:55:32
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\router\index.ts
 */
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: '/home',
			component: () => import('@/views/index.vue'),
			children: [
				{
					path: '/home',
					component: () => import('@/views/home/home.vue'),
				},
				{
					path: '/bar',
					component: () => import('@/views/d3Page/d3Bar.vue'),
				},
				{
					path: '/pie',
					component: () => import('@/views/d3Page/d3Pie.vue'),
				},
				{
					path: '/chord',
					component: () => import('@/views/d3Page/d3Chord.vue'),
				},
				{
					path: '/point',
					component: () => import('@/views/d3Page/d3Point.vue'),
				},
				{
					path: '/china',
					component: () => import('@/views/d3Page/d3China.vue'),
				},
				{
					path: '/cloud',
					component: () => import('@/views/d3Page/d3Cloud.vue'),
				}
			]
		}
	]
})
export default router