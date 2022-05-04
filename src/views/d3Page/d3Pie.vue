<!--
 * @Author: DongZS
 * @Date: 2022-04-20 13:56:04
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\d3Page\d3Pie.vue
-->
<template>
  <div class="gutter-example simple-pie-chart-demo" v-if="data">
    <a-row :gutter="10">
      <a-col :span="12" class="gutter-row">
        <a-card hoverable title="D3 简单圆环图">
          <d3SimpleCircleChart :data="data"></d3SimpleCircleChart>
        </a-card>
      </a-col>
      <a-col :span="12" class="gutter-row">
        <a-card hoverable title="D3 简单饼图">
          <d3SimplePieChart :data="data"></d3SimplePieChart>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <div v-else>加载中。。。</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import d3SimplePieChart from "@/components/d3SimplePieChart.vue";
import d3SimpleCircleChart from "@/components/d3SimpleCircleChart.vue";
import { getPieData } from "@/api/index";
import bus from "@/assets/util/bus"
export default defineComponent({
  name: "dePie",
  components: {
    d3SimplePieChart,
    d3SimpleCircleChart,
  },
  setup() {
    onMounted(() => {
      initData()
      bus.on('searchData', () => {
        initData()
      })
    });
    const initData = () => {
      getPieData().then((res: any) => {
        state.data = res.data;
      });
    };
    const state = reactive({
      data: null,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
</style>