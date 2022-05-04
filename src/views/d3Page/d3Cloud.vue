<!--
 * @Author: DongZS
 * @Date: 2022-04-20 10:18:17
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\d3Page\d3Cloud.vue
-->
<template>
  <d3SimpleCloudChart :data="data" v-if="data"></d3SimpleCloudChart>
  <div v-else>加载中。。。</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import d3SimpleCloudChart from "@/components/d3SimpleCloudChart.vue";
import { getCloudData } from '@/api/index'
import bus from "@/assets/util/bus"
export default defineComponent({
  name: "d3Cloud",
	components: {
		d3SimpleCloudChart
	},
  setup() {
    onMounted(() => {
      initData()
      bus.on('searchData', () => {
        initData()
      })
    })
    const initData = () => {
      getCloudData().then((res: any) => {
        state.data = res.data
      })
    }
    const state = reactive({
      data: null
    });
		return {
			...toRefs(state)
		}
  },
});
</script>

<style scoped>
</style>