<template>
  <div class="equipment-selector d-flex">
    <el-select
      v-model="selectedFloor"
      placeholder="選擇樓層"
      class="mr-3 custom-select"
      @change="() => {
        selectedField= selectedEquipment = undefined;
      }"
    >
      <el-option
        v-for="floor in floors"
        :key="floor.value"
        :label="floor.label"
        :value="floor.value"
      ></el-option>
    </el-select>

    <el-select
      v-model="selectedField"
      placeholder="選擇場域"
      class="custom-select"
      @change="() => {
      selectedEquipment = undefined;
      }"
    >
      <el-option
        v-for="field in fields"
        :key="field.value"
        :label="field.label"
        :value="field.value"
      ></el-option>
    </el-select>
    <el-select
      v-model="selectedEquipment"
      placeholder="選擇設備名稱"
      class="custom-select"
      @change="HandleEquipmentSelected"
    >
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
      selectedField: null,
      selectedEquipment: null,
      floors: [
        { value: 3, label: '3F' },
        { value: 4, label: '4F' }
        // 添加更多樓層
      ],
      fields: [
        { value: 'AOI', label: 'AOI(AOI)' },
        { value: 'SE', label: '美格SE(MEC)' },
        { value: 'YEL', label: '黃光(YEL)' },
        // 添加更多樓層
      ],
      equipments: [
        { value: 'AGV_001', label: 'AGV_001' },
        { value: 'AGV_002', label: 'AGV_002' }
        // 添加更多設備
      ]
    }
  },
  methods: {
    HandleEquipmentSelected() {
      this.$router.push(`/equipments?floor=${this.selectedFloor}&field=${this.selectedField}&equipment=${this.selectedEquipment}`)
      this.$emit('OnEquipmentSelected', { floor: this.selectedFloor, field: this.selectedField, equipmentName: this.selectedEquipment });
    }
  },
  mounted() {
    console.log(this.$route);

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
