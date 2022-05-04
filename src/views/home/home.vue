<!--
 * @Author: DongZS
 * @Date: 2022-04-15 14:26:03
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\home\home.vue
-->
<template>
  <d3SimpleForceChart :data="data" v-if="data"></d3SimpleForceChart>
  <div v-else>加载中。。。</div>
</template>

<script lang="ts">
import d3SimpleForceChart from '@/components/d3SimpleForceChart.vue'
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getForceData } from '@/api/index'
export default defineComponent({
  name: "homeCom",
  components: {
    d3SimpleForceChart
  },
  setup() {
    const state = reactive({
      data: null
    });
    onMounted(() => {
      getForceData().then((res: any) => {
        state.data = res.data
      })
    })
    return {
      ...toRefs(state)
    }
  },
});
</script>

<style scoped>
</style>