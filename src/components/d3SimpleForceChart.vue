<!--
 * @Author: DongZS
 * @Date: 2022-04-15 16:02:16
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\components\d3SimpleForceChart.vue
-->
<template>
  <div class="force-chart--simple" style="height: 100%;">
		<svg ref="forceRef"></svg>
	</div>
</template>

<script lang="ts">
interface Edge {
  source: number,
  target: number,
  relation?: string,
  value: number
}
interface Node {
  name: string
}
import { defineComponent, ref, onMounted } from "vue";
import useCurrentInstance from "@/assets/util/useCurrentInstance"
export default defineComponent({
  name: "d3SimpleForceChart",
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
		const { proxy } = useCurrentInstance()
    const forceRef = ref<any>(null);
    const initForce = (): void => {
      const containerWidth = forceRef.value.parentNode.offsetWidth;
      const data = props.data;
      const margin = { top: 60, right: 60, bottom: 60, left: 60 };
      const width = containerWidth - margin.left - margin.right;
      const height = 700 - margin.top - margin.bottom;
      let chart = proxy.$d3
        .select(forceRef.value)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      let g = chart
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // 设最外包层在总图上的相对位置
      // 缩放拖拽
      chart.call(proxy.$d3.zoom().scaleExtent([0.5, 2]).on('zoom', () => {
        g.attr("transform", proxy.$d3.event.transform)
      }))
      let simulation = proxy.$d3
        .forceSimulation() // 构建力导向图
        .force("link", proxy.$d3
            .forceLink()
            .id(function(d: any, i: number) :number {
              return i;
            })
            .distance(function (d: any): number {
              return d.value * 50;
            })
        )
        .force("charge", proxy.$d3.forceManyBody())  // 引力
        .force("center", proxy.$d3.forceCenter(width / 2, height / 2))  // 中心点
        .force("collide", proxy.$d3.forceCollide().radius(() => 80))  // 碰撞力

      let z = proxy.$d3.scaleOrdinal(proxy.$d3.schemeCategory20); // 通用线条的颜色

      let link = g
        .append("g") // 画连接线
        .attr("class", "links")
        .selectAll("line")
        .data(data.edges)
        .enter()
        .append("line");

      let linkText = g
        .append("g") // 画连接连上面的关系文字
        .attr("class", "link-text")
        .selectAll("text")
        .data(data.edges)
        .enter()
        .append("text")
        .text(function (d: any) {
          return d.relation;
        });

      let node = g
        .append("g") // 画圆圈和文字
        .attr("class", "nodes")
        .selectAll("g")
        .data(data.nodes)
        .enter()
        .append("g")
        .on("mouseover", function (d: any) {
          //显示连接线上的文字
          linkText.style("fill-opacity", function (edge: Edge) {
            if (edge.source === d || edge.target === d) {
              return 1;
            }
          });
          //连接线加粗
          link
            .style("stroke-width", function (edge: Edge) {
              if (edge.source === d || edge.target === d) {
                return "2px";
              }
            })
            .style("stroke", function (edge: Edge) {
              if (edge.source === d || edge.target === d) {
                return "#000";
              }
            });
        })
        .on("mouseout", function (d: any) {
          //隐去连接线上的文字
          linkText.style("fill-opacity", function (edge: Edge) {
            if (edge.source === d || edge.target === d) {
              return 0;
            }
          });
          //连接线减粗
          link
            .style("stroke-width", function (edge: Edge) {
              if (edge.source === d || edge.target === d) {
                return "1px";
              }
            })
            .style("stroke", function (edge: Edge) {
              if (edge.source === d || edge.target === d) {
                return "#ddd";
              }
            });
        })
        .call(
          proxy.$d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      node
        .append("circle")
        .attr("r", 5)
        .attr("fill", function (d: any, i: number) {
          return z(i);
        });

      node
        .append("text")
        .attr("fill", function (d: any, i: number) {
          return z(i);
        })
        .attr("y", -20)
        .attr("dy", ".71em")
        .text(function (d: Node) {
          return d.name;
        });

      simulation // 初始化力导向图
        .nodes(data.nodes)
        .on("tick", ticked);

      simulation.force("link").links(data.edges);

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
        .text("人物关系图");

      function ticked() {
        // 力导向图变化函数，让力学图不断更新
        link
          .attr("x1", function (d: any) {
            return d.source.x;
          })
          .attr("y1", function (d: any) {
            return d.source.y;
          })
          .attr("x2", function (d: any) {
            return d.target.x;
          })
          .attr("y2", function (d: any) {
            return d.target.y;
          });
        linkText
          .attr("x", function (d: any) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function (d: any) {
            return (d.source.y + d.target.y) / 2;
          });
        node.attr("transform", function (d: any) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }

      function dragstarted(d: any) {
        if (!proxy.$d3.event.active) {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d :any) {
        d.fx = proxy.$d3.event.x;
        d.fy = proxy.$d3.event.y;
      }

      function dragended(d :any) {
        if (!proxy.$d3.event.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
    };
		onMounted(() => {
			initForce()
		});
    return {
      forceRef,
    };
  },
});
</script>

<style scoped>
</style>