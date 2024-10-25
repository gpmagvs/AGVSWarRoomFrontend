<template>
  <el-card class="my-card">
    <template #header>
      <div class="card-header">
        <slot name="header">Header</slot>
      </div>
    </template>
    <slot>Default card body</slot>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.my-card {
  border: none;
  border-radius: 4px;
  margin: 10px 10px;
  ::v-deep .el-card__header {
    border-bottom: 1px solid #2c2c2c;
    background-color: var(--card-bg-color);
    font-weight: bold;
    letter-spacing: 5px;
    padding: 5px 10px;
  }
  ::v-deep .el-card__body {
    background-color: var(--card-bg-color);
    padding: 17px 7px;
  }

  .card-header {
    color: var(--card-header-color);
  }
}
</style>
