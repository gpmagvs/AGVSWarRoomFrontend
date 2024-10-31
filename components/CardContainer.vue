<template>
  <el-card class="my-card">
    <template #header>
      <div class="card-header">
        <slot name="header">Header</slot>
      </div>
    </template>
    <div class="w-100 h-100 bg-dark py-3 rounded">
      <slot>Default card body</slot>
    </div>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.my-card {
  border: 1px solid #656565;
  border-radius: 4px;
  margin: 5px;
  ::v-deep .el-card__header {
    border-bottom: 1px solid #2c2c2c;
    background-color: var(--card-bg-color);
    font-weight: bold;
    letter-spacing: 5px;
    padding: 5px 10px;
  }
  ::v-deep .el-card__body {
    background-color: var(--card-bg-color);
    padding: 3px;
    height: 100%;
    color: white;
  }

  .card-header {
    color: var(--card-header-color);
  }
}
</style>
