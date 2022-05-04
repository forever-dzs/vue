<!--
 * @Author: DongZS
 * @Date: 2022-04-20 16:24:13
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimpleChinaChart.vue
-->
<template>
  <div class="china-map-chart--simple" style="height: 100%">
    <svg ref="chinaRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useCurrentInstance from "@/assets/util/useCurrentInstance";
export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
		const chinaRef = ref<any>(null)
		const { proxy } = useCurrentInstance()
		onMounted(() => {
			initChina()
		})
    const initChina = () => {
      const containerWidth = chinaRef.value.parentNode.offsetWidth;
      const data = props.data;
      const margin = {
        top: 80,
        right: 20,
        bottom: 30,
        left: 60,
      };
      const width = containerWidth - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;
      let chart = proxy.$d3
        .select(chinaRef.value)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      let projection = proxy.$d3
        .geoMercator() // 定义墨卡托地理投射(平面投射)
        .center([107, 31])
        .scale(proxy.$d3.min([width, height]))
        .translate([width / 2, height / 2]);

      let path = proxy.$d3
        .geoPath() // 定义路径
        .projection(projection);

      let z = proxy.$d3.scaleOrdinal(proxy.$d3.schemeCategory20); // 通用线条的颜色

      let g = chart
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")") // 设最外包层在总图上的相对位置
        .style("fill-opacity", 0);

      let province = g
        .selectAll("path") // 绘画所有的省
        .data(data.features)
        .enter()
        .append("path")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("fill", function (d: any, i: number) {
          return z(i);
        })
        .attr("d", path)
        .on("mouseover", function () {
          proxy.$d3.select(proxy.$d3.event.target).attr("fill", "yellow");
        })
        .on("mouseout", function (d: any, i: number) {
          proxy.$d3.select(proxy.$d3.event.target).attr("fill", z(i));
        });

      province
        .append("title") // 输出Title，mouseover显示
        .text(function (d: any) {
          return d.properties.name;
        });

      g.transition().duration(1000).style("fill-opacity", 1); // 动画渐现

      chart
        .append("g") // 输出标题
        .attr("class", "bar--title")
        .append("text")
        .attr("fill", "#000")
        .attr("font-size", "16px")
        .attr("font-weight", "700")
        .attr("text-anchor", "middle")
        .attr("x", containerWidth / 2)
        .attr("y", 20)
        .text("中国地图");
    };
		return {
			chinaRef
		}
  },
});
</script>
<style scoped>
</style>