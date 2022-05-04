<!--
 * @Author: DongZS
 * @Date: 2022-04-15 18:05:52
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\d3Page\d3Bar.vue
-->
<template>
  <d3SimpleBarChart :data="data" v-if="data"></d3SimpleBarChart>
  <div v-else>加载中。。。</div>
</template>

<script lang="ts">
import d3SimpleBarChart from "@/components/d3SimpleBarChart.vue";
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getBarData } from '@/api/index'
import bus from "@/assets/util/bus"
export default defineComponent({
  name: "d3Bar",
  components: {
    d3SimpleBarChart,
  },
  setup() {
    onMounted(() => {
      initData()
      bus.on('searchData', () => {
        initData()
      })
    })
    const initData = () => {
      getBarData().then((res: any) => {
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