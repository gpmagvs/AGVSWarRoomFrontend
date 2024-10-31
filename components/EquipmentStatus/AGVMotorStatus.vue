<template>
  <div class="agv-motor-status d-flex text-light">
    <div class="w-50 mx-2">
      <h6 class="border-bottom">左輪</h6>
      <el-form class label-position="left" label-width="70px">
        <FormItem label="電壓">25.32 V</FormItem>
        <FormItem label="電流">23.2 A</FormItem>
        <FormItem label="異常碼">0</FormItem>
      </el-form>
    </div>
    <div class="w-50 mx-2">
      <h6 class="border-bottom">右輪</h6>
      <el-form label-position="left" label-width="70px">
        <FormItem label="電壓">25.32 V</FormItem>
        <FormItem label="電流">23.2 A</FormItem>
        <FormItem label="異常碼">0</FormItem>
      </el-form>
    </div>
    <div class="w-50 mx-2">
      <h6 class="border-bottom">牙叉</h6>
      <el-form label-position="left" label-width="70px">
        <FormItem label="電壓">25.32 V</FormItem>
        <FormItem label="電流">23.2 A</FormItem>
        <FormItem label="異常碼">0</FormItem>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agv-motor-status {
  h6 {
    font-size: 14px;
    color: grey;
    border-bottom-color: grey !important;
  }
}
</style>
