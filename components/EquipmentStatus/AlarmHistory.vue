<template>
  <div class="alarm-history">
    <el-table
      :data="alarms"
      border
      height="250"
      :header-cell-style="{ backgroundColor: 'grey', color: 'white', fontWeight: 'bold' }"
      :row-style="{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }"
      style="background-color: black;border-color: grey;"
    >
      <el-table-column prop="Time" label="時間" width="170">
        <template slot-scope="scope">
          <el-button type="text" class="text-warning w-100">{{ scope.row.Time }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="AlarmCode" label="Alarm Code" width="105">
        <template slot-scope="scope">
          <el-button type="text" class="text-warning w-100">{{ scope.row.AlarmCode }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="AlarmMessage" label="Alarm Message">
        <template slot-scope="scope">
          <el-button type="text" class="w-100 text-warning text-start">{{ scope.row.AlarmMessage }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    alarms: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>
</style>
