/*
 * @Author: DongZS
 * @Date: 2022-04-15 15:51:38
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\shims-core.d.ts
 */
/* eslint-disable */
import { ComponentCustomProperties } from "vue";
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$d3: any,
		$d3Tip: any
	}
}
