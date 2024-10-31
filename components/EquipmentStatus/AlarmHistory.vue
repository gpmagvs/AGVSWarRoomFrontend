<template>
  <div class="alarm-history">
    <el-table
      :data="tableData"
      border
      height="250"
      header-cell-style="background-color: var(--card-bg-color)"
      :row-style="{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }"
      :row-class-name="getRowClassName"
      style="background-color: black;border-color: grey;"
    >
      <el-table-column prop="date" label="時間" width="170">
        <template slot-scope="scope">
          <el-button type="text" class="text-warning w-100">{{ scope.row.date }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Alarm Code" width="105">
        <template slot-scope="scope">
          <el-button type="text" class="text-warning w-100">{{ scope.row.name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Alarm Message">
        <template slot-scope="scope">
          <el-button type="text" class="w-100 text-warning text-start">{{ scope.row.address }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2024-01-01 00:00:00',
          name: 10002,
          address: 'Alarm Message'
        }
      ]
    }
  }
}
</script>

<style>
</style>
