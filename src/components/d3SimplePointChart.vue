<!--
 * @Author: DongZS
 * @Date: 2022-04-21 18:50:18
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimplePointChart.vue
-->
<template>
  <div class="points-chart--simple" style="height: 100%;">
    <svg ref="pointRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import useCurrentInstance from "@/assets/util/useCurrentInstance";
export default defineComponent({
  name: "pointChart",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const pointRef = ref<any>(null);
    const { proxy } = useCurrentInstance();
    onMounted(() => {
      initPoint(props.data);
    });
    watch(props, (val) => {
			initPoint(val.data);
		}, {
			deep: true,
		});
    const initPoint = (data: any) => {
      const containerWidth = pointRef.value.parentNode.offsetWidth;
      const margin = { top: 80, right: 60, bottom: 80, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;
      let chart = proxy.$d3
        .select(pointRef.value)
				.html('')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      let x = proxy.$d3
        .scaleLinear()
        .domain([
          0,
          proxy.$d3.max(data, function (d: any) {
            return d[0];
          }),
        ])
        .range([0, width]);
      let y = proxy.$d3
        .scaleLinear()
        .rangeRound([0, height])
        .domain([
          proxy.$d3.max(data, function (d: any) {
            return d[1];
          }),
          0,
        ]);
      let z = proxy.$d3.scaleOrdinal(proxy.$d3.schemeCategory10); // 通用线条的颜色

      let g = chart
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置

      let tip = proxy.$d3Tip() // 设置tip
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d: any) {
          return (
            "<strong>运动年限:</strong><span style='color:#ffeb3b'> " +
            d[0] +
            " </span><br><strong>健康指数:</strong><span style='color:#ffeb3b'> " +
            d[1] +
            " </span>"
          );
        });

      chart.call(tip);

      g.append("g") // 设置x轴
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(proxy.$d3.axisBottom(x))
        .append("text")
        .attr("x", width)
        .attr("y", 26)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "#000")
        .text("激烈运动年限 (年)");

      g.append("g") // 设置y轴
        .attr("class", "axis axis--y")
        .call(proxy.$d3.axisLeft(y))
        .append("text")
        .attr("y", -16)
        .attr("dy", ".71em")
        .style("text-anchor", "start")
        .style("fill", "#000")
        .text("健康指数 (分)");

      g.append("g") // 输出点
        .selectAll("circle")
        .attr("class", "points")
        .data(data)
        .enter()
        .append("circle")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .attr("cursor", "pointer")
        .attr("fill", function (d: any) {
          return z(d[1]);
        })
        .attr("cx", function (d: any) {
          return x(d[0]);
        })
        .attr("cy", function (d: any) {
          return y(d[1]);
        })
        .attr("r", 0)
        .transition()
        .duration(750)
        .delay(function (d: any, i: number) {
          return i * 10;
        })
        .attr("r", 10);
      chart
        .append("g") // 输出标题
        .attr("class", "chart--title")
        .append("text")
        .attr("fill", "#000")
        .attr("font-size", "16px")
        .attr("font-weight", "700")
        .attr("text-anchor", "middle")
        .attr("x", containerWidth / 2)
        .attr("y", 20)
        .text("简单散点图");
    };
    return {
      pointRef,
    };
  },
});
</script>
<style scoped>
</style>