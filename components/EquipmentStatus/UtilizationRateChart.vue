<template>
  <div class="utilization-rate-chart">
    <div ref="chart" class="chart-container border"></div>
    <div class="legend">
      <div class="legend-item">
        <div class="legend-item-color" :style="{ backgroundColor: downStatusColor }"></div>Down
      </div>
      <div class="legend-item">
        <div class="legend-item-color" :style="{ backgroundColor: idleStatusColor }"></div>Idle
      </div>
      <div class="legend-item">
        <div class="legend-item-color" :style="{ backgroundColor: runStatusColor }"></div>Run
      </div>
      <div class="legend-item">
        <div class="legend-item-color" :style="{ backgroundColor: chargingStatusColor }"></div>Charging
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    this.initChart();
  },
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    runStatusColor: {
      type: String,
      default: 'lime'
    },
    downStatusColor: {
      type: String,
      default: 'red'
    },
    idleStatusColor: {
      type: String,
      default: 'orange'
    },
    chargingStatusColor: {
      type: String,
      default: 'blue'
    }
  },
  data() {
    return {
      chart: null,
      option: {
        backgroundColor: 'rgb(24, 24, 24)',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        tooltip: {
          formatter: function (params) {
            return `${params.marker} ${params.name}: ${new Date(params.value[0]).toLocaleTimeString()} - ${new Date(params.value[1]).toLocaleTimeString()}`;
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            formatter: function (value) {
              return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          },
          axisTick: {
            alignWithLabel: true,
            interval: 3600 * 1000 // 每小時一個刻度
          },
          splitLine: {
            show: true,
            interval: 3600 * 1000 // 每小時一條分隔線
          }
        },
        yAxis: {
          type: 'category',
          data: ['Status']
        },
        series: [
          {
            type: 'custom',
            renderItem: function (params, api) {
              const categoryIndex = api.value(2);
              const start = api.coord([api.value(0), categoryIndex]);
              const end = api.coord([api.value(1), categoryIndex]);
              const height = api.size([0, 1])[1] * 1;

              return {
                type: 'rect',
                shape: {
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                },
                style: api.style()
              };
            },
            itemStyle: {
              color: function (params) {
                return params.data[3]; // Use the color from the data
              }
            },
            encode: {
              x: [0, 1],
              y: 2
            },
            data: [
              // [new Date('2023-10-01 09:00').getTime(), new Date('2023-10-01 09:10').getTime(), 0, 'orange'],
              // [new Date('2023-10-01 09:10').getTime(), new Date('2023-10-01 09:20').getTime(), 0, 'red'],
            ]
          }
        ],
        // dataZoom: [
        //   {
        //     type: 'slider', // 這是滑動條模式
        //     start: 0,      // 默認顯示的起始位置
        //     end: 100       // 默認顯示的結束位置
        //   },
        //   {
        //     type: 'inside' // 這是內部縮放模式，支持鼠標滾輪縮放
        //   }
        // ]
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);
      window.addEventListener('resize', () => this.chart.resize());
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {

        // 如果新舊數據相同就不更新

        this.option.series[0].data = newVal.data;
        this.option.xAxis.min = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        // this.option.xAxis.max = newVal.data[newVal.data.length - 1][1];
        // 重新繪製圖表(不是用 initChart 是因為 initChart 會重新初始化圖表)
        this.chart.setOption(this.option);
      },
      deep: true,
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 300px; /* 設置固定高度 */
  padding: 0; /* 設置 padding 為 0 */
  box-sizing: border-box; /* 確保寬高計算包含邊框和內邊距 */
}
.legend {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  .legend-item {
    color: rgb(177, 177, 177);
    display: flex;
    align-items: center;
    gap: 5px;
    .legend-item-color {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
}
</style>
