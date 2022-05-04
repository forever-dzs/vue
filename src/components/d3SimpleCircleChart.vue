<!--
 * @Author: DongZS
 * @Date: 2022-04-20 14:00:25
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimpleCircleChart.vue
-->
<template>
  <div class="ring-chart--simple" style="height: 100%">
    <svg ref="ringRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import useCurrentInstance from "@/assets/util/useCurrentInstance";
export default defineComponent({
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
    const ringRef = ref<any>(null);
    const { proxy } = useCurrentInstance();
    let currentData: any = null;
    onMounted(() => {
      initRing(props.data);
    });
    watch(props, (val) => {
      initRing(val.data)
    }, {
      deep: true
    })
    const initRing = (data: any) => {
      const containerWidth = ringRef.value.parentNode.offsetWidth;
      const margin = { top: 80, right: 60, bottom: 80, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;
      let chart = proxy.$d3
        .select(ringRef.value)
        .html('')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom); // 设置总宽高

      const radius = Math.min(width, height) / 2;

      let g = chart
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (width / 2 + margin.left) +
            "," +
            (margin.top + radius) +
            ")"
        ); // 设最外包层在总图上的相对位置

      let colors = proxy.$d3
        .scaleOrdinal()
        .range([
          "#98abc5",
          "#8a89a6",
          "#7b6888",
          "#6b486b",
          "#a05d56",
          "#d0743c",
          "#ff8c00",
        ]);

      let arc = proxy.$d3
        .arc() // 定义单个圆弧
        // .outerRadius(radius - 10)
        .innerRadius(radius - 70)
        .padAngle(0.03);

      let ageLabelArc = proxy.$d3
        .arc() // 定义单个圆弧里面的age文字
        .outerRadius(radius - 60)
        .innerRadius(radius - 60);

      let percentLabelArc = proxy.$d3
        .arc() // 定义单个圆弧里面的percent文字
        .outerRadius(radius - 20)
        .innerRadius(radius - 20);

      let populationLabelArc = proxy.$d3
        .arc() // 定义单个圆弧里面的population文字
        .outerRadius(radius + 20)
        .innerRadius(radius + 20);

      let pie = proxy.$d3
        .pie() // 定义饼图
        .sort(null)
        .value(function (d: any) {
          return d.population;
        });

      const sumData = proxy.$d3.sum(data, function (d: any) {
        return d.population;
      });
      colors.domain(
        proxy.$d3
          .map(data, function (d: any) {
            return d.age;
          })
          .keys()
      ); // 定义颜色值域

      g.selectAll(".arc") // 画环图
        .data(pie(data))
        .enter()
        .append("path")
        .each(function (d: any) {
          // 储存当前起始与终点的角度、并设为相等
          let tem = { ...d, endAngle: d.startAngle };
          d.outerRadius = radius - 10;
          currentData = tem;
        })
        .on("mouseover", arcTween(radius + 50, 0))
        .on("mouseout", arcTween(radius - 10, 150))
        .attr("cursor", "pointer")
        .attr("class", "arc")
        .style("fill", function (d: any) {
          return colors(d.data.age);
        })
        .transition()
        .duration(750)
        .attrTween("d", function (next: any) {
          // 动态设置d属性、生成动画
          var i = proxy.$d3.interpolate(currentData, next);
          currentData = i(0); // 重设当前角度
          return function (t: any) {
            return arc(i(t));
          };
        });

      const arcs = pie(data); // 构造圆弧

      let label = g.append("g");
      arcs.forEach(function (d: any) {
        // 输出age文字
        const c = ageLabelArc.centroid(d);
        label
          .append("text")
          .attr("class", "age-text")
          .attr("fill", "#000")
          .attr("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("x", c[0])
          .attr("y", c[1])
          .text(d.data.age + "岁");
      });

      arcs.forEach(function (d: any) {
        // 输出percent文字
        const c = percentLabelArc.centroid(d);
        label
          .append("text")
          .attr("class", "age-text")
          .attr("fill", "#cddc39")
          .attr("font-weight", "700")
          .attr("font-size", "14px")
          .attr("text-anchor", "middle")
          .attr("x", c[0])
          .attr("y", c[1])
          .text(((d.data.population * 100) / sumData).toFixed(1) + "%");
      });

      arcs.forEach(function (d: any) {
        // 输出population文字
        var c = populationLabelArc.centroid(d);
        label
          .append("text")
          .attr("class", "age-text")
          .attr("fill", "#000")
          .attr("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("x", c[0])
          .attr("y", c[1])
          .text((d.data.population / 10000).toFixed(2) + "万人");
      });

      chart
        .append("g") // 输出标题
        .attr("class", "arc--title")
        .append("text")
        .attr("fill", "#000")
        .attr("font-size", "14px")
        .attr("font-weight", "700")
        .attr(
          "transform",
          "translate(" +
            (width / 2 + margin.left) +
            "," +
            (margin.top + radius) +
            ")"
        )
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 0)
        .text("XX市人口年龄结构");

      function arcTween(outerRadius: number, delay: number) {
        // 设置缓动函数
        return function () {
          proxy.$d3
            .select(proxy.$d3.event.target)
            .transition()
            .delay(delay)
            .attrTween("d", function (d: any) {
              var i = proxy.$d3.interpolate(d.outerRadius, outerRadius);
              return function (t: any) {
                d.outerRadius = i(t);
                return arc(d);
              };
            });
        };
      }
    };
    return {
      ringRef,
    };
  },
});
</script>
<style scoped>
</style>