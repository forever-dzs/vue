/*
 * @Author: DongZS
 * @Date: 2022-04-20 17:06:12
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\mock\index.ts
 */
import Mock from 'mockjs'
import chinaJson from '@/assets/json/china.json'

// 菜单栏
Mock.mock('http://127.0.0.1:8080/inter/getSideList', 'get', {
	code: 0,
	message: '成功',
	data: [
		{
			key: "home",
			name: "力导向关系图",
			path: "/home",
		},
		{
			key: "sub1",
			name: "D3.js图库",
			children: [
				{
					key: "bar",
					name: "D3.js简单柱状图",
					path: "/bar",
				},
				{
					key: "pie",
					name: "D3.js简单饼图、圆环图",
					path: "/pie",
				},
				{
					key: "chord",
					name: "D3.js简单弦图",
					path: "/chord",
				},
				{
					key: "point",
					name: "D3.js简单散点图",
					path: "/point",
				},
				{
					key: "china",
					name: "D3.js简单地图",
					path: "/china",
				},
				{
					key: "cloud",
					name: "D3.js简单词云",
					path: "/cloud",
				},
			],
		},
	]
})

// 力导向图
Mock.mock('http://127.0.0.1:8080/inter/getForce', 'get', {
	code: 0,
	message: '成功',
	data: {
		nodes: [
			{ name: "A人物" },
			{ name: "B人物" },
			{ name: "C人物" },
			{ name: "D人物" },
			{ name: "E人物" },
			{ name: "F人物" },
			{ name: "G人物" },
			{ name: "H人物" },
			{ name: "I人物" },
			{ name: "J人物" },
			{ name: "K人物" },
			{ name: "L人物" },
			{ name: "M人物" },
		],
		edges: [
			{ source: 0, target: 1, relation: "朋友", value: 3 },
			{ source: 0, target: 2, relation: "朋友", value: 3 },
			{ source: 0, target: 3, relation: "朋友", value: 6 },
			{ source: 1, target: 2, relation: "朋友", value: 6 },
			{ source: 1, target: 3, relation: "朋友", value: 7 },
			{ source: 2, target: 3, relation: "朋友", value: 7 },
			{ source: 0, target: 4, relation: "朋友", value: 3 },
			{ source: 0, target: 5, relation: "朋友", value: 3 },
			{ source: 4, target: 5, relation: "夫妻", value: 1 },
			{ source: 0, target: 6, relation: "兄弟", value: 2 },
			{ source: 4, target: 6, relation: "同学", value: 3 },
			{ source: 5, target: 6, relation: "同学", value: 3 },
			{ source: 4, target: 7, relation: "同学", value: 4 },
			{ source: 5, target: 7, relation: "同学", value: 3 },
			{ source: 6, target: 7, relation: "同学", value: 3 },
			{ source: 4, target: 8, relation: "师生", value: 4 },
			{ source: 5, target: 8, relation: "师生", value: 5 },
			{ source: 6, target: 8, relation: "师生", value: 3 },
			{ source: 7, target: 8, relation: "师生", value: 5 },
			{ source: 8, target: 9, relation: "师生", value: 4 },
			{ source: 3, target: 9, relation: "师生", value: 5 },
			{ source: 2, target: 10, relation: "母子", value: 1 },
			{ source: 10, target: 11, relation: "雇佣", value: 6 },
			{ source: 10, target: 12, relation: "雇佣", value: 6 },
			{ source: 11, target: 12, relation: "同事", value: 7 },
		],
	},
})

// 柱状图
Mock.mock('http://127.0.0.1:8080/inter/getBar', 'get', {
	code: 0,
	message: '成功',
	"data|5-10": [
		{
			"letter": "@cname",
			"frequency|1": ["0.11", "0.02", "0.12", "0.3", "0.24"]
		}
	]
})

// 饼图
Mock.mock('http://127.0.0.1:8080/inter/getPie', 'get', {
	code: 0,
	message: '成功',
	"data": [
		{ age: "<5", population: "@natural(1000, 80000)" },
		{ age: "5-13", population: "@natural(1000, 80000)" },
		{ age: "14-17", population: "@natural(1000, 80000)" },
		{ age: "18-24", population: "@natural(1000, 80000)" },
		{ age: "25-44", population: "@natural(1000, 80000)" },
		{ age: "45-64", population: "@natural(1000, 80000)" },
		{ age: "≥65", population: "@natural(1000, 80000)" }
	]
})

// 弦图
Mock.mock('http://127.0.0.1:8080/inter/getChord', 'get', {
	code: 0,
	message: '成功',
	"data": {
		names: ["北京", "上海", "广州", "深圳"],
		"matrix|4": [
			["@natural(100, 8000)", "@natural(100, 8000)", "@natural(100, 8000)", "@natural(100, 8000)"]
		],
	}
})

// 散点图
Mock.mock('http://127.0.0.1:8080/inter/getPoint', 'get', {
	code: 0,
	message: '成功',
	"data|15-20": [
		["@natural(5, 100)", "@natural(5, 100)"]
	]
})

// 词云
Mock.mock('http://127.0.0.1:8080/inter/getCloud', 'get', {
	code: 0,
	message: '成功',
	"data|20-30": [
		{
			name: "@cname",
			"value|1-10": 1,
			href: "https://www.baidu.com"
		}
	] 
})

//地图
Mock.mock('http://127.0.0.1:8080/inter/getChina', 'get', {
	code: 0,
	message: '成功',
	data: chinaJson
})