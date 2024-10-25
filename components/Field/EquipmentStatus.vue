<template>
  <el-table
    :data="tableData"
    border
    header-cell-style="background-color: var(--card-bg-color)"
    height="500"
    :row-style="{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }"
    :row-class-name="getRowClassName"
    style="background-color: black;border-color: grey;"
  >
    <el-table-column label="設備名稱" prop="name" align="center">
      <template slot-scope="scope">
        <el-button type="text" class="w-100">{{ scope.row.name }}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="類型" prop="type" align="center">
      <template slot-scope="scope">
        <el-tag effect="dark">{{ scope.row.type }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="連線狀態" prop="status" align="center">
      <template slot-scope="scope">
        <el-tag
          effect="dark"
          :type="scope.row.status === '連線中' ? 'success' : 'danger'"
        >{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="運轉狀態" prop="runningStatus" align="center">
      <template slot-scope="scope">
        <el-tag
          effect="dark"
          :type="scope.row.runningStatus === '運轉中' ? 'success' : 'danger'"
        >{{ scope.row.runningStatus }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: 'AGV1',
          type: 'AGV',
          status: '斷線',
          runningStatus: '當機'
        },
        {
          name: 'AGV2',
          type: 'AGV',
          status: '連線中',
          runningStatus: '運轉中'
        },
        {
          name: 'AGV3',
          type: 'AGV',
          status: '連線中',
          runningStatus: '運轉中'
        },
        {
          name: '設備2',
          type: '充電器',
          status: '斷線',
          runningStatus: '當機'
        }
      ]
    }
  },
  methods: {
    getRowClassName() {
      return 'custom-row';
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-status {
  height: 100%;

  .equipment-row {
    background-color: black !important;
  }
}

.custom-row:hover {
  background-color: black !important; /* 覆蓋懸停時的背景顏色 */
  color: black !important;
}
</style>
