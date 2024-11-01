<template>
  <div class="equipment-selector d-flex">
    <el-select
      v-model="selectedState.floor"
      placeholder="選擇樓層"
      class="mr-3 custom-select"
      @change="StoreFloorSelect"
    >
      <el-option
        v-for="floor in floors"
        :key="floor.value"
        :label="floor.label"
        :value="floor.value"
      ></el-option>
    </el-select>

    <el-select
      v-model="selectedState.field"
      placeholder="選擇場域"
      class="custom-select"
      @change="StoreFieldSelect"
    >
      <el-option
        v-for="field in fields"
        :key="field.value"
        :label="field.label"
        :value="field.value"
      ></el-option>
    </el-select>
    <el-select
      v-model="selectedState.eqName"
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
      selectedState: {
        floor: 0,
        field: '',
        eqName: '',
        eqType: 0
      }
    }
  },
  computed: {
    floors() {
      try {
        return this.$store.getters['ui/FloorOptions'];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    fields() {
      return this.$store.getters['ui/FieldOptions'](this.selectedState.floor);
    },
    equipments() {
      return this.$store.getters['ui/EquipmentOptions'](this.selectedState.floor, this.selectedState.field);
    },
    selectedEqType() {
      return this.equipments.find(equipment => equipment.value == this.selectedState.eqName)?.eqType;
    }
  },
  methods: {
    StoreFloorSelect(floor) {
      this.selectedState.field = this.selectedState.eqName = undefined;
      console.info(floor)
      this.$store.commit('ui/UpdateEqSelectState', this.selectedState)
      this.SaveEqSelectStateToLocalStorage(this.selectedState)
    },
    StoreFieldSelect(field) {
      this.selectedState.eqName = undefined;
      this.$store.commit('ui/UpdateEqSelectState', this.selectedState)
      this.SaveEqSelectStateToLocalStorage(this.selectedState)
    },
    StoreEqNameSelect(eqName) {
      this.$store.commit('ui/UpdateEqSelectState', this.selectedState)
    },
    HandleEquipmentSelected(eqName) {

      this.selectedState.eqType = this.selectedEqType;
      this.$store.commit('ui/UpdateEqSelectState', this.selectedState)
      this.StopSignalrConnectionAndConnect()
      this.SaveEqSelectStateToLocalStorage(this.selectedState)
      this.EmitEquipmentSelected()
    },
    EmitEquipmentSelected() {
      this.$emit('equipment-selected', {
        floor: this.selectedState.floor,
        field: this.selectedState.field,
        eqName: this.selectedState.eqName,
        eqType: this.selectedEqType
      });
    },
    StopSignalrConnectionAndConnect() {
      this.$store.dispatch('signalr/stopConnection');
      setTimeout(() => {
        this.$store.dispatch('signalr/startEquipmentsStateConnection', this.selectedState);
      }, 200);
    },
    SaveEqSelectStateToLocalStorage(state) {
      localStorage.setItem('EqSelectState', JSON.stringify(state));
    },
    GetEqSelectStateFromLocalStorage() {
      return JSON.parse(localStorage.getItem('EqSelectState'));
    }

  },
  mounted() {
    // var _floorOptions = this.$store.getters['ui/FloorOptions'];
    // console.info(_floorOptions);
    const selectState = this.GetEqSelectStateFromLocalStorage();
    if (selectState) {
      Object.assign(this.selectedState, selectState);
      this.$store.commit('ui/UpdateEqSelectState', this.selectedState)
    } else {
      selectState = this.$store.getters['ui/EqSelectState'];
      Object.assign(this.selectedState, selectState);
    }
    console.info(this.selectedState)
    this.StopSignalrConnectionAndConnect()
    setTimeout(() => {
      this.EmitEquipmentSelected();
    }, 200);
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
