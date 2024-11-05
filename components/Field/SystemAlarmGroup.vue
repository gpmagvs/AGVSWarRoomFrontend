<template>
  <div class="system-alarm-group">
    <div class="system-alarm-group-item w-100">
      <el-tag class="w-100" size="large" effect="dark" type="danger">當前警報</el-tag>
    </div>
    <div class="system-alarm-group-item d-flex justify-content-between">
      <!-- CST Reader讀取失敗率; AGV Fail Rate; E84 Fail Rate; MCS Fail Rate -->
      <RatioDisplay :width="120" :value="10">
        <template #title>CST讀取失敗率</template>
      </RatioDisplay>
      <RatioDisplay :width="120" :value="7">
        <template #title>AGV當機率</template>
      </RatioDisplay>
      <RatioDisplay :width="120" :value="5">
        <template #title>交握失敗率</template>
      </RatioDisplay>
      <RatioDisplay :width="120" :value="2">
        <template #title>MCS任務失敗率</template>
      </RatioDisplay>
    </div>
  </div>
</template>

<script>
import RatioDisplay from '../RatioDisplay.vue';
export default {
  components: {
    RatioDisplay
  }
}
</script>

<style lang="scss" scoped>
.system-alarm-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
