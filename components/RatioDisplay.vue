<template>
  <div class="ratio-display text-light">
    <div v-if="!noTitle" class="ratio-display-title w-100">
      <slot name="title">Title</slot>
    </div>
    <div class="w-100 text-center">
      <el-progress :width="width" type="circle" stroke-width="15" :percentage="50" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noTitle: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '170'
    }
  },
}
</script>

<style lang="scss" scoped>
.ratio-display {
  width: 170px;
  .ratio-display-title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }

  ::v-deep .el-progress__text {
    font-size: 22px !important;
    color: white !important;
  }
}
</style>
