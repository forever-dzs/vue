<!--
 * @Author: DongZS
 * @Date: 2022-04-15 19:12:53
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimpleBarChart.vue
-->
<template>
  <div class="bar-chart--simple" style="height: 100%;">
		<svg ref="barRef"></svg>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import useCurrentInstance from "@/assets/util/useCurrentInstance";
export default defineComponent({
  name: "barChart",
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
		const barRef = ref<any>(null);
		const { proxy } = useCurrentInstance();
    onMounted(() => {
      initBar(props.data);
    })
    watch(props, (val) => {
      initBar(val.data)
    }, {
      deep: true
    })
    const initBar = (data: any): void => {
      const containerWidth = barRef.value.parentNode.offsetWidth;
      const margin = {
        top: 80,
        right: 20,
        bottom: 30,
        left: 60,
      };
      const width = containerWidth - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;
      let chart = proxy.$d3
        .select(barRef.value)
        .html('')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      let x = proxy.$d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.3)
        .domain(
          data.map(function (d: any) {
            return d.letter;
          })
        ); // 设置x轴
      let y = proxy.$d3
        .scaleLinear()
        .rangeRound([height, 0])
        .domain([
          0,
          proxy.$d3.max(data, function (d: any) {
            return d.frequency;
          }),
        ]); // 设置y轴

      const barWidth = (width / data.length) * 0.7; // 用于绘制每条柱
      const stepArray = proxy.$d3.ticks(
        0,
        proxy.$d3.max(data, (d: any) => d.frequency),
        10
      ); // 用于生成背景柱
      const colors = ["#ccc", "#ddd"]; // 用于生成背景柱
      let tip = proxy.$d3Tip() // 设置tip
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d: any) {
          return (
            "<strong>星期" +
            d.letter +
            "<br>空置率:</strong> <span style='color:#ffeb3b'>" +
            (d.frequency * 100).toFixed(2) +
            "%</span>"
          );
        });

      chart.call(tip);

      let g = chart
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置

      g.append("g") // 设置x轴
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(proxy.$d3.axisBottom(x));

      g.append("g") // 设置y轴
        .attr("class", "axis axis--y")
        .call(proxy.$d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("y", -16)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .style("fill", "#000")
        .text("空置率 (%)");

      g.append("g") // 设置背景柱
        .attr("class", "bar--bg-bar")
        .selectAll("rect")
        .data(proxy.$d3.range(stepArray.length - 1))
        .enter()
        .append("rect")
        .attr("stroke", "none")
        .attr("stroke-width", 0)
        .attr("fill", function (d: any, i: number) {
          return colors[i % 2];
        })
        .attr("x", 1)
        .attr("width", width)
        .attr("height", function (d: any, i: number) {
          return y(stepArray[i]) - y(stepArray[i + 1]);
        })
        .attr("y", function (d: any, i: number) {
          return y((i + 1) * stepArray[1]);
        });

      g.selectAll(".bar") // 画柱图
        .data(data)
        .enter()
        .append("rect")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .attr("class", "bar")
        .attr("fill", "#8a2be2")
        .attr("x", function (d: any) {
          return x(d.letter);
        })
        .attr("y", height) // 控制动画由下而上
        .attr("width", x.bandwidth())
        .attr("height", 0) // 控制动画由下而上
        .transition()
        .duration(200)
        .ease(proxy.$d3.easeBounceInOut)
        .delay(function (d: any, i: number) {
          return i * 200;
        })
        .attr("y", function (d: any) {
          return y(d.frequency);
        })
        .attr("height", function (d: any) {
          return height - y(d.frequency);
        });

      g.append("g") // 输出柱图上的数值
        .attr("class", "bar--text")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("fill", "orange")
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .attr("x", function (d: any) {
          return x(d.letter);
        })
        .attr("y", function (d: any) {
          return y(d.frequency);
        })
        .attr("dx", barWidth / 2)
        .attr("dy", "1em")
        .text(function (d: any) {
          return (d.frequency * 100).toFixed(2) + "%";
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

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
        .text("简单柱状图");
    };
		return {
			barRef
		}
  },
});
</script>

<style scoped>
</style>