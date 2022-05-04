/*
 * @Author: DongZS
 * @Date: 2022-04-18 10:53:17
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\assets\util\useCurrentInstance.ts
 */
import { getCurrentInstance, ComponentInternalInstance } from "vue"
export default () => {
	const { appContext } = getCurrentInstance() as ComponentInternalInstance
	const proxy = appContext.config.globalProperties
	return { proxy }
}