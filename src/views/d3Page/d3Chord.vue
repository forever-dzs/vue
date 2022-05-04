<!--
 * @Author: DongZS
 * @Date: 2022-04-20 15:28:51
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\d3Page\d3Chord.vue
-->
<template>
  <d3SimpleChordChart :data="data" v-if="data"></d3SimpleChordChart>
  <div v-else>加载中。。。</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import d3SimpleChordChart from "@/components/d3SimpleChordChart.vue";
import { getChordData } from '@/api/index'
import bus from "@/assets/util/bus"
export default defineComponent({
  components: {
    d3SimpleChordChart,
  },
  setup() {
    onMounted(() => {
      initData()
      bus.on('searchData', () => {
        initData()
      })
    })
    const initData = () => {
      getChordData().then((res: any) => {
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