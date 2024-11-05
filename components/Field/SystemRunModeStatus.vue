<template>
  <div class="system-run-mode-status">
    <div class="system-run-mode-status-item">
      <span>操作模式</span>
      <el-tag size="small" effect="dark" type="danger">維護</el-tag>
    </div>

    <div class="system-run-mode-status-item">
      <span>上層系統</span>
      <el-tag size="small" effect="dark" type="danger">OFFLINE</el-tag>
    </div>

    <div class="system-run-mode-status-item">
      <span>任務派送模式</span>
      <el-tag size="small" effect="dark" type="danger">LOCAL</el-tag>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.system-run-mode-status {
  display: flex;
  flex-direction: row;
  gap: 20px;
  span {
    margin-right: 10px;
  }
}
</style>
