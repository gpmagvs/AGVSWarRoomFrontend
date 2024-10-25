<template>
  <el-card>
    <template #header>
      <div class="card-header" v-bind:class="`text-${statusClass}`">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="card-content"> <label class="status-number" v-bind:class="`text-${statusClass}`"> {{ num }}</label> </div>
  </el-card>
</template>
<script>
export default {
  name: 'numofvechicleStatus',
  props: {
    title: {
      type: String,
      default: "Title"
    },
    num: {
      type: Number,
      default: 0
    },
    statusClass: {
      type: String,
      default: "dark"
    }
  },

}
</script>
<style scoped>
.status-number {
  font-size: 50px;
}
</style>
