<template>
  <div class="equipment-selector d-flex">
    <el-select
      v-model="selectedFloor"
      placeholder="選擇樓層"
      class="mr-3 custom-select"
      @change="() => {
        selectedEquipment = undefined;
      }"
    >
      <el-option
        v-for="floor in floors"
        :key="floor.value"
        :label="floor.label"
        :value="floor.value"
      ></el-option>
    </el-select>
    <el-select v-model="selectedEquipment" placeholder="選擇設備名稱" class="custom-select">
      <el-option
        v-for="equipment in equipments"
        :key="equipment.value"
        :label="equipment.label"
        :value="equipment.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedFloor: null,
      selectedEquipment: null,
      floors: [
        { value: '3', label: '3F' },
        { value: '4', label: '4F' }
        // 添加更多樓層
      ],
      equipments: [
        { value: 'A', label: '設備A' },
        { value: 'B', label: '設備B' }
        // 添加更多設備
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.equipment-selector {
  /* background-color: #1f1f1f; */
  ::v-deep .custom-select .el-input__inner {
    background-color: black;
    color: white; /* 確保文字顏色與背景顏色對比明顯 */
  }
}
</style>
