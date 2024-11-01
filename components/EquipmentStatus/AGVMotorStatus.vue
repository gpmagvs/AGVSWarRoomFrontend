<template>
  <div class="agv-motor-status d-flex text-light">
    <div class="w-50 mx-2">
      <h6 class="border-bottom">左輪</h6>
      <el-form class label-position="left" label-width="70px">
        <FormItem
          class="digital-font"
          label="電壓"
        >{{ (agvData.MotorLeftVoltage/1000.0).toFixed(1) }} V</FormItem>
        <FormItem
          class="digital-font"
          label="電流"
        >{{ (agvData.MotorLeftCurrent/1000.0).toFixed(1) }} A</FormItem>
        <FormItem class="digital-font" label="異常碼">{{ agvData.MotorLeftAlarmCode }}</FormItem>
      </el-form>
    </div>
    <div class="w-50 mx-2">
      <h6 class="border-bottom">右輪</h6>
      <el-form label-position="left" label-width="70px">
        <FormItem
          class="digital-font"
          label="電壓"
        >{{ (agvData.MotorRightVoltage/1000.0).toFixed(1) }} V</FormItem>
        <FormItem
          class="digital-font"
          label="電流"
        >{{ (agvData.MotorRightCurrent/1000.0).toFixed(1) }} A</FormItem>
        <FormItem class="digital-font" label="異常碼">{{ agvData.MotorRightAlarmCode }}</FormItem>
      </el-form>
    </div>
    <div class="w-50 mx-2">
      <h6 class="border-bottom">牙叉</h6>
      <el-form label-position="left" label-width="70px">
        <FormItem
          class="digital-font"
          label="電壓"
        >{{ (agvData.MotorLeftVoltage/1000.0).toFixed(1) }} V</FormItem>
        <FormItem
          class="digital-font"
          label="電流"
        >{{ (agvData.MotorLeftCurrent/1000.0).toFixed(1) }} A</FormItem>
        <FormItem class="digital-font" label="異常碼">{{ agvData.MotorLeftAlarmCode }}</FormItem>
      </el-form>
    </div>
  </div>
</template>
<script>
import AgvStatus from '../../utils/models/AgvStatus';
export default {
  props: {
    agvData: {
      type: AgvStatus,
      default: () => new AgvStatus()
    }
  }
}
</script>
<style lang="scss" scoped>
.agv-motor-status {
  h6 {
    font-size: 14px;
    color: grey;
    border-bottom-color: grey !important;
  }
}
</style>
