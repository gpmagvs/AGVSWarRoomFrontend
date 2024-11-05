<template>
  <div class="tasks-list">
    <el-table
      border
      :row-style="tableStyle.rowStyle"
      :header-cell-style="tableStyle.headerStyle"
      :data="tasks"
      style="width: 100%"
    >
      <el-table-column prop="taskId" label="ID" show-overflow-tooltip width="120" />
      <el-table-column prop="taskType" align="center" label="類型" show-overflow-tooltip width="60" />
      <el-table-column prop="taskStatus" align="center" label="狀態" show-overflow-tooltip width="80">
        <template #default="scope">
          <el-tag class="w-100 text-center" effect="dark">{{ scope.row.taskStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskStartPoint"
        align="center"
        label="起點"
        show-overflow-tooltip
        width="120"
      />
      <el-table-column
        prop="taskEndPoint"
        align="center"
        label="終點"
        show-overflow-tooltip
        width="120"
      />
      <el-table-column
        prop="taskStartTime"
        align="center"
        label="開始時間"
        show-overflow-tooltip
        width="160"
      />
      <el-table-column
        prop="taskEndTime"
        align="center"
        label="結束時間"
        show-overflow-tooltip
        width="160"
      />
      <el-table-column
        prop="taskVehicle"
        align="center"
        label="車輛"
        show-overflow-tooltip
        width="100"
      />
      <el-table-column
        prop="taskOperator"
        align="center"
        label="派工人員"
        show-overflow-tooltip
        width="120"
      />
      <el-table-column prop="taskFailReason" label="失敗原因" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableStyle: {
        headerStyle: {
          backgroundColor: 'rgb(0, 38, 53)',
          color: 'white'
        },
        rowStyle: {
          backgroundColor: 'black',
          color: 'white'
        }
      },
      tasks: [
        {
          taskId: 'M1234567890',
          taskType: '搬運',
          taskStatus: '進行中',
          taskStartPoint: 'A1',
          taskEndPoint: 'B1',
          taskStartTime: '2024-01-01 12:00:00',
          taskEndTime: '2024-01-01 12:00:00',
          taskVehicle: 'AGV_001',
          taskOperator: '張三',
          taskFailReason: '無'
        },
        {
          taskId: 'M1234567891',
          taskType: '搬運',
          taskStatus: '完成',
          taskStartPoint: 'A1',
          taskEndPoint: 'B1',
          taskStartTime: '2024-01-01 12:00:00',
          taskEndTime: '2024-01-01 12:00:00',
          taskVehicle: 'AGV_001',
          taskOperator: '張三',
          taskFailReason: '無'
        },
        {
          taskId: 'M1234567892',
          taskType: '搬運',
          taskStatus: '取消',
          taskStartPoint: 'A1',
          taskEndPoint: 'B1',
          taskStartTime: '2024-01-01 12:00:00',
          taskEndTime: '2024-01-01 12:00:00',
          taskVehicle: 'AGV_002',
          taskOperator: '張三',
          taskFailReason: '無'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks-list {
}
</style>
