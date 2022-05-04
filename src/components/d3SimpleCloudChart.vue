<!--
 * @Author: DongZS
 * @Date: 2022-04-20 10:26:20
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimpleCloudChart.vue
-->
<template>
  <div class="tag-cloud-chart--simple" style="height: 100%;">
    <svg ref="cloudRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import useCurrentInstance from "@/assets/util/useCurrentInstance";
export default defineComponent({
  name: "d3SimpleCloudChart",
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
    const cloudRef = ref<any>(null);
    const { proxy } = useCurrentInstance();
		onMounted(() => {
			initCloud(props.data)
		})
    watch(props, (val) => {
      initCloud(val.data)
    }, {
      deep: true
    })
    const initCloud = (data: any) => {
      const containerWidth = cloudRef.value.parentNode.offsetWidth;
      let chart = proxy.$d3.select(cloudRef.value).html('');

      let fill = proxy.$d3.scaleOrdinal(proxy.$d3.schemeCategory20); // 定义颜色

      let words = data.map((item: any) => {
        // 处理原始数据
        return {
          text: item.name,
          size: 10 + item.value * 8,
          href: item.href,
        };
      });

      let layout = proxy.$d3Cloud() // 构建云图
        .size([containerWidth, 700])
        .words(words)
        .padding(5)
        .rotate(function () {
          return Math.floor((Math.random() * 2)) * 90;
        })
        .font("Impact")
        .fontSize(function (d: any) {
          return d.size;
        })
        .on("end", draw);

      layout.start();

      function draw(words: object[]) {
        // 输出所有标签
        let g = chart
          .attr("width", containerWidth)
          .attr("height", 700)
          .append("g")
          .attr(
            "transform",
            "translate(" + containerWidth / 2 + "," + 700 / 2 + ")"
          );

        g.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .on("click", function (d: any) {
            window.open(d.href);
          })
          .style("font-family", "Impact")
          .style("cursor", "pointer")
          .style("fill", function (d: any, i: number) {
            return fill(i);
          })
          .attr("text-anchor", "middle")
          .attr("transform", function (d: any) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .style("font-size", function (d: any) {
            return d.size + "px";
          })
          .text(function (d: any) {
            return d.text;
          })
          .append("title")
          .text(function (d: any) {
            return d.href;
          });

        g.selectAll("text") // 创建动画
          .style("fill-opacity", 0)
          .transition()
          .duration(200)
          .delay(function (d: any, i: number) {
            return i * 200;
          })
          .style("fill-opacity", 1);
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
					.text("简单词云");
      }
    };
		return {
			cloudRef
		}
  },
});
</script>

<style scoped>
</style>