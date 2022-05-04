<!--
 * @Author: DongZS
 * @Date: 2022-04-21 18:46:44
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\d3Page\d3Point.vue
-->
<template>
	<d3SimplePointChart :data="data" v-if="data"></d3SimplePointChart>
	<div v-else>加载中。。。</div>
</template>
<script>
import d3SimplePointChart from "@/components/d3SimplePointChart.vue";
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getPointData } from '@/api/index'
import bus from "@/assets/util/bus"
export default defineComponent({
	name: "d3Point",
  components: {
    d3SimplePointChart,
  },
  setup() {
    onMounted(() => {
      initData()
      bus.on('searchData', () => {
        initData()
      })
    })
    const initData = () => {
      getPointData().then((res) => {
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