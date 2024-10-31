<template>
  <el-form-item class="form-item" :label="label">
    <label class="px-2 w-100">
      <slot>def</slot>
    </label>
  </el-form-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
  },
}
</script>

<style lang="scss" scoped>
.form-item {
  label {
    background-color: rgba(97, 97, 97, 0.685);
    color: white;
    border-radius: 8px;
  }
  label:hover {
    background-color: rgb(167, 108, 0);
    cursor: pointer;
  }
}
</style>
