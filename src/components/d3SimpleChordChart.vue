<!--
 * @Author: DongZS
 * @Date: 2022-04-20 15:35:01
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimpleChordChart.vue
-->
<template>
  <div class="chord-chart--simple" style="height: 100%; ">
    <svg ref="chordRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
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
    const chordRef = ref<any>(null);
    const { proxy } = useCurrentInstance();
		onMounted(() => {
			initChord(props.data)
		})
    watch(props, (val) => {
      initChord(val.data)
    }, {
      deep: true
    })
    const initChord = (data: any) => {
      const containerWidth = chordRef.value.parentNode.offsetWidth;
      const names = data.names;
      const matrix = data.matrix;
      const margin = { top: 100, right: 60, bottom: 100, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;
      const outerRadius = Math.min(width, height) * 0.5 - 40;
      const innerRadius = outerRadius - 30;
      let chart = proxy.$d3
        .select(chordRef.value)
        .html('')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      let chord = proxy.$d3
        .chord() // 弦
        .padAngle(0.1)
        .sortSubgroups(proxy.$d3.descending)(matrix);

      let arc = proxy.$d3
        .arc() // 用于画弧
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      let ribbon = proxy.$d3
        .ribbon() // 用于画中间色带
        .radius(innerRadius);

      let color = proxy.$d3
        .scaleOrdinal() // 四种颜色
        .domain(proxy.$d3.range(4))
        .range(["#98abc5", "#7b6888", "#a05d56", "#ff8c00"]);

      let tip = proxy.$d3Tip() // 设置tip
        .attr("class", "d3-tip simple-chord")
        .offset([-10, 0])
        .html(function (d: any) {
          if (d.source.index !== d.source.subindex) {
            return (
              "<strong>" +
              names[d.source.index] +
              "->" +
              names[d.source.subindex] +
              ":</strong><span style='color:#ffeb3b'> " +
              (d.source.value / 10000).toFixed(2) +
              "万" +
              " </span>件<br><strong>" +
              names[d.target.index] +
              "->" +
              names[d.target.subindex] +
              ":</strong><span style='color:#ffeb3b'> " +
              (d.target.value / 10000).toFixed(2) +
              "万</span> 件"
            );
          } else {
            return (
              "<strong>" +
              names[d.source.index] +
              "->" +
              names[d.source.subindex] +
              ":</strong><span style='color:#ffeb3b'> " +
              (d.source.value / 10000).toFixed(2) +
              "万</span> 件"
            );
          }
        });

      chart.call(tip);

      let g = chart
        .append("g") // 构建弦
        .attr(
          "transform",
          "translate(" +
            containerWidth / 2 +
            "," +
            (height + margin.top + margin.bottom) / 2 +
            ")"
        )
        .datum(chord);

      let group = g
        .append("g") // 画刻度组
        .attr("class", "groups")
        .selectAll("g")
        .data(function (chords: any) {
          return chords.groups;
        })
        .enter()
        .append("g");

      group
        .append("path") // 画弧
        .style("fill", function (d: any) {
          return color(d.index);
        })
        .style("stroke", function (d: any) {
          return proxy.$d3.rgb(color(d.index)).darker();
        })
        .attr("d", arc);

      group
        .append("g") // 输出名字
        .attr("class", "group-name")
        .attr("transform", function (d: any) {
          return (
            "rotate(" +
            (((d.endAngle - (d.endAngle - d.startAngle) / 2) * 180) / Math.PI -
              90) +
            ") translate(" +
            (outerRadius + 60) +
            ",0)"
          );
        })
        .append("text")
        .attr("fill", function (d: any) {
          return proxy.$d3.rgb(color(d.index)).darker();
        })
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function (d: any) {
          return d.endAngle - (d.endAngle - d.startAngle) / 2 > Math.PI
            ? "rotate(180) translate(-16)"
            : null;
        })
        .style("text-anchor", function (d: any) {
          return d.endAngle - (d.endAngle - d.startAngle) / 2 > Math.PI
            ? "end"
            : null;
        })
        .style("font-size", "16px")
        .style("font-weight", "700")
        .text(function (d: any) {
          return names[d.index];
        });

      let groupTick = group
        .selectAll(".group-tick") // 画刻度
        .data(function (d: any) {
          return groupTicks(d, 1e3);
        })
        .enter()
        .append("g")
        .attr("class", "group-tick")
        .attr("transform", function (d: any) {
          return (
            "rotate(" +
            ((d.angle * 180) / Math.PI - 90) +
            ") translate(" +
            outerRadius +
            ",0)"
          );
        });

      groupTick
        .append("line") // 画刻度线
        .attr("x2", 6);

      groupTick // 输出刻度上的文字
        .filter(function (d: any) {
          return d.value % 5e3 === 0;
        })
        .append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function (d: any) {
          return d.angle > Math.PI ? "rotate(180) translate(-16)" : null;
        })
        .style("text-anchor", function (d: any) {
          return d.angle > Math.PI ? "end" : null;
        })
        .text(function (d: any) {
          return (d.value / 10000).toFixed(2) + "万";
        });

      g.append("g") // 输出彩带
        .attr("class", "ribbons")
        .selectAll("path")
        .data(function (chords: any) {
          return chords;
        })
        .enter()
        .append("path")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .attr("d", ribbon)
        .style("fill", "#fff")
        .style("stroke", "#fff")
        .transition()
        .duration(50)
        .delay(function (d: any, i: number) {
          return i * 50;
        })
        .style("fill", function (d: any) {
          return color(d.target.index);
        })
        .style("cursor", "pointer")
        .style("stroke", function (d: any) {
          return proxy.$d3.rgb(color(d.target.index)).darker();
        });

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
        .text("简单弦图");

      // Returns an array of tick angles and values for a given group and step.
      function groupTicks(d: any, step: any) {
        var k = (d.endAngle - d.startAngle) / d.value;
        return proxy.$d3.range(0, d.value, step).map(function (value: any) {
          return { value: value, angle: value * k + d.startAngle };
        });
      }
    };
    return {
      chordRef,
    };
  },
});
</script>
<style scoped>
</style>