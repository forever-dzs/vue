<!--
 * @Author: DongZS
 * @Date: 2022-04-20 15:47:41
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\d3Page\d3China.vue
-->
<template>
  <d3SimpleChinaChart :data="data" v-if="data"></d3SimpleChinaChart>
	<div v-else>加载中。。。</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue"
import d3SimpleChinaChart from "@/components/d3SimpleChinaChart.vue";
import { getChinaData } from '@/api/index'
export default defineComponent({
  components: {
		d3SimpleChinaChart
  },
  setup() {
    const state = reactive({
			data: null
		})
		onMounted(() => {
			getChinaData().then((res: any) => {
				state.data = res.data
			})
		})
		return {
			...toRefs(state)
		}
  }
})
</script>
<style scoped>

</style>