<template>
  <div class="agv-status">
    <div class="w-100 d-flex flex-row">
      <CardContainer class="w-50">
        <template #header>
          <div>設備狀態</div>
        </template>
        <template>
          <div class="d-flex">
            <el-form class="w-50 mx-2" label-position="left" label-width="70px">
              <FormItem label="狀態">{{ agvData.Status }}</FormItem>
              <FormItem label="任務類型">{{ agvData.RunningTask.TaskType }}</FormItem>
              <FormItem label="任務ID">{{ agvData.RunningTask.TaskID }}</FormItem>
            </el-form>
            <el-form class="w-50 mx-2" label-position="left" label-width="70px">
              <FormItem label="上線狀態">{{ agvData.OnlineState }}</FormItem>
              <FormItem label="起點">{{ agvData.RunningTask.FromStationName }}</FormItem>
              <FormItem label="終點">{{ agvData.RunningTask.ToStationName }}</FormItem>
            </el-form>
          </div>
        </template>
      </CardContainer>
      <CardContainer class="w-50">
        <template #header>
          <div>電池狀態</div>
        </template>
        <template>
          <div class="d-flex text-light">
            <RatioDisplay class="mx-4" :value="agvData.BatLevel.toFixed(1)">
              <template #title>電量</template>
            </RatioDisplay>
            <el-form class="w-50 mx-2" label-position="left" label-width="70px">
              <FormItem
                class="digital-font"
                label="電壓"
              >{{ (agvData.BatVoltage/1000.0).toFixed(1) }} V</FormItem>
              <FormItem
                class="digital-font"
                label="放電電流"
              >{{ (agvData.BatDisChargeCurrent/1000.0).toFixed(1) }} A</FormItem>
              <FormItem
                class="digital-font"
                label="充電電流"
              >{{ (agvData.BatChargeCurrent/1000.0).toFixed(1) }} A</FormItem>
            </el-form>
            <el-form class="w-50 mx-2" label-position="left" label-width="70px">
              <FormItem class="digital-font" label="溫度">25.32</FormItem>
              <FormItem class="digital-font" label="狀態碼">0</FormItem>
              <FormItem class="digital-font" label="異常碼">0</FormItem>
            </el-form>
          </div>
        </template>
      </CardContainer>
      <CardContainer class="w-50">
        <template #header>
          <div>馬達狀態</div>
        </template>
        <template>
          <AGVMotorStatus :agvData="agvData" />
        </template>
      </CardContainer>
      <!-- <CardContainer class="mileage">
          <template #header>總里程</template>
          <template>
            <div class="text-center h-100 value">
              123
              <span>km</span>
            </div>
          </template>
      </CardContainer>-->
    </div>
    <div class="w-100 d-flex">
      <CardContainer class="w-50">
        <template #header>當日任務執行狀態</template>
        <template>
          <div class="d-flex">
            <RatioDisplay
              class="mx-4"
              :width="180"
              :value="agvData.DailyTaskStatistics.SuccessRate"
            >
              <template #title>成功率</template>
            </RatioDisplay>
            <div class="flex-fill">
              <div class="d-flex p-2 task-status">
                <div class="w-50 text-center">
                  <label>任務數</label>
                  <h1>{{ agvData.DailyTaskStatistics.TotalTaskNum }}</h1>
                </div>
                <div class="w-50 text-center">
                  <label>搬運任務數</label>
                  <h1>{{ agvData.DailyTaskStatistics.TransferTaskNum }}</h1>
                </div>
                <div class="w-50 text-center">
                  <label>充電任務數</label>
                  <h1>{{ agvData.DailyTaskStatistics.ChargeTaskNum }}</h1>
                </div>
              </div>
              <div class="d-flex p-3 task-status">
                <div class="w-50 text-center">
                  <label>成功次數</label>
                  <h1>{{ agvData.DailyTaskStatistics.TotalSuccessNum }}</h1>
                </div>
                <div class="w-50 text-center">
                  <label>失敗次數</label>
                  <h1>{{ agvData.DailyTaskStatistics.TotalFailureNum }}</h1>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CardContainer>
      <CardContainer class="w-100">
        <template #header>24小時稼動狀態</template>
        <template>
          <div class="d-flex">
            <!-- <PieChart class="w-50 bg-dark" id="pie-chart" /> -->
            <UtilizationRateChart
              :data="agvData.UtilizationViewData"
              class="flex-fill"
              id="utilization-chart"
              runStatusColor="lime"
            />
          </div>
        </template>
      </CardContainer>
    </div>
    <div class="w-100 d-flex">
      <CardContainer class="w-50">
        <template #header>當日任務執行狀態</template>
        <template>
          <div class="d-flex p-2 task-status">
            <div class="w-50 text-center">
              <label>任務數</label>
              <h1>0</h1>
            </div>
            <div class="w-50 text-center">
              <label>搬運任務數</label>
              <h1>0</h1>
            </div>
            <div class="w-50 text-center">
              <label>充電任務數</label>
              <h1>0</h1>
            </div>
          </div>
          <div class="d-flex p-3 task-status">
            <div class="w-50 text-center">
              <label>成功次數</label>
              <h1>0</h1>
            </div>
            <div class="w-50 text-center">
              <label>失敗次數</label>
              <h1>0</h1>
            </div>
            <div class="w-50 text-center">
              <label>成功率</label>
              <h1>100%</h1>
              <!-- <RatioDisplay :noTitle="true"></RatioDisplay> -->
            </div>
          </div>
        </template>
      </CardContainer>
      <CardContainer class="w-100">
        <template #header>異常紀錄</template>
        <template>
          <AlarmHistory :alarms="agvData.Alarm.CurrentAlarms" />
        </template>
      </CardContainer>
    </div>
    {{ agvData }}
  </div>
</template>

<script>
import AlarmHistory from './AlarmHistory.vue';
import UtilizationRateChart from './UtilizationRateChart.vue';
import PieChart from '@/components/Charts/PieChart.vue';
import AGVMotorStatus from './AGVMotorStatus.vue';
import AgvStatus from '../../utils/models/AgvStatus';
export default {
  components: {
    AlarmHistory,
    UtilizationRateChart,
    AGVMotorStatus,
    PieChart
  },
  computed: {
    agvData() {
      var _data = this.$store.state.signalr.realTimeEquipmentStatus.Data;
      let agvStatus = new AgvStatus();
      _.merge(agvStatus, _data);
      return agvStatus;
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.agv-status {
  .mileage {
    width: 300px;
    .value {
      font-size: 60px;
    }
  }
  .task-status {
    div {
      margin: 3px;
      label {
        letter-spacing: 5px;
        position: relative;
        top: -11px;
      }
      h1 {
        border-radius: 8px;
        font-weight: bold;
        background-color: black;
        height: 50px;
        align-content: center;
      }
    }
  }
}
</style>
