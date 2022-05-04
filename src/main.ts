/*
 * @Author: DongZS
 * @Date: 2022-04-13 18:44:33
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router/index'
import * as d3 from 'd3'
import * as d3Tip from 'd3-tip'
import * as d3Cloud from 'd3-cloud'

// 启用mock
import '@/mock/index'

import '@/assets/style/Charts.css'
import '@/assets/style/Common.css'
import '@/assets/style/Home.css'

const app = createApp(App)
app.config.globalProperties = {
  ...app.config.globalProperties,
	$d3: d3,
	$d3Tip: d3Tip,
	$d3Cloud: d3Cloud
}
app.use(router).use(Antd).mount('#app')
