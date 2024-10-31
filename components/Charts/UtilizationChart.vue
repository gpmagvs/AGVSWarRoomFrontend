<template>
  <div class="echart" :id="id" style="width:100%;height: 250px;"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      default: "utilization-chart"
    },
  },
  data() {
    return {
      myChart: {},
      pieData: [
        {
          value: 23,
          name: "項目1",
          itemStyle: {
            color: 'red', // 自定義顏色
          }
        }, {
          value: 223,
          name: "項目2",
          itemStyle: {
            color: 'green', // 自定義顏色
          }
        }, {
          value: 423,
          name: "項目3",
          itemStyle: {
            color: 'blue', // 自定義顏色
          }
        }
      ]
    }
  },
  methods: {

    initEcharts() {
      const option = {
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: "{b}:{c} ({d}%)",
              // position: 'inside', // 設定標籤顯示於內部
            },
            radius: '70%',
            data: this.pieData
          }
        ]

      }
      this.myChart = echarts.init(document.getElementById(this.id));
      this.myChart.setOption(option);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      })
    }
  },
  mounted() {
    this.initEcharts();
  }
}
</script>
<style></style>
