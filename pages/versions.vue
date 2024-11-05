<template>
  <div class="versions-container">
    <!-- <EquipmentSelector :noEquipment="true" @field-selected="handleFieldSelected" /> -->
    <!-- <div>{{ getGroupedByFloor }}</div> -->
    <div
      class="mb-2 px-2 pb-3"
      v-for="floor in Object.keys(getGroupedByFloor).reverse()"
      :key="floor"
    >
      <div class="floor-title border-bottom border-gold mb-2">{{ floor }}F</div>
      <el-table
        :key="isCollapse"
        :data="getGroupedByFloor[floor]"
        :row-style="{ backgroundColor: 'black', color: 'white',borderColor:'grey' }"
        :header-cell-style="{ backgroundColor: 'black', color: 'gold',borderColor:'grey' }"
        class="no-hover"
        default-expand-all
      >
        <el-table-column prop="name" label="場域" width="100">
          <template #default="scope">
            <span style="font-size:20px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="version" label="版本號">
          <template #default="scope">
            <el-tag class="version-tag" effect="dark" type="success">{{ scope.row.version }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="車輛版本" type="expand" width="100">
          <template #default="scope">
            <el-table
              :data="scope.row.vehiclesVersions"
              :header-cell-style="{ backgroundColor: 'rgb(151, 151, 151)', color: 'black' }"
              :row-style="{ backgroundColor: 'rgb(100, 100, 100)', color: 'white' }"
            >
              <el-table-column prop="name" label="AGV" width="100" />
              <el-table-column prop="version" label="車載系統版本" width="200">
                <template #default="scope">
                  <el-tag class="version-tag" effect="dark">{{ scope.row.version }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="version" label="車控系統版本">
                <template #default="scope">
                  <el-tag class="version-tag" effect="dark">{{ scope.row.version }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { AGVSFieldVersionInfo } from '@/utils/models/Version'
export default {
  name: 'Versions',
  data() {
    return {
      selectedField: {
        floor: 0,
        field: ""
      }
    }
  },
  computed: {
    versions() {
      let versions = this.$store.getters['version/getVersions']
      let _versions = [new AGVSFieldVersionInfo()];
      Object.assign(_versions, versions);
      return _versions;
    },
    selectedFieldVersionInfo() {
      return this.versions.find(v => v.floor === this.selectedField.floor && v.name === this.selectedField.field)
    },
    vehiclesVersionsOfSelectedField() {
      if (!this.selectedFieldVersionInfo)
        return [];
      return this.selectedFieldVersionInfo.vehiclesVersions;
    },
    getGroupedByFloor() {
      return this.versions.reduce((acc, curr) => {
        acc[curr.floor] = acc[curr.floor] || [];
        acc[curr.floor].push(curr);
        return acc;
      }, {});
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  methods: {
    handleFieldSelected(field) {
      this.selectedField = field;

    },
    mergeCells({ row, column, rowIndex }) {
      if (column.property === 'floor') {
        const floor = row.floor;
        let rowspan = 1;
        for (let i = rowIndex + 1; i < this.versions.length; i++) {
          if (this.versions[i].floor === floor) {
            rowspan++;
          } else {
            break;
          }
        }
        return {
          rowspan,
          colspan: 1
        };
      }
      return {
        rowspan: 1,
        colspan: 1
      };
    }
  },
  mounted() {
    this.$watch(
      () => this.$route,
      (newRoute, oldRoute) => {
        if (newRoute.name === 'versions') {
          this.$store.dispatch('version/fetchVersions')
        }
      },
      { deep: true, immediate: true }
    );
  }
}
</script>

<style lang="scss" scoped>
.versions-container {
  height: 100vh;
  overflow-y: auto;
  ::v-deep .no-hover {
    .el-table__body {
      i {
        color: white !important;
        font-size: 18px !important;
      }
      .el-table__expanded-cell,
      .el-table__empty-block {
        background-color: black !important;
      }
      .el-table__row:hover {
        cursor: pointer;
        td {
          background-color: rgba(255, 217, 0, 0.488) !important;
          // color: black !important;
        }
      }
    }
  }
  .floor-title {
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 5px;
  }
  .version-tag {
    // background-color: rgb(0, 0, 0) !important;
    // color: gold !important;
    width: 100px;
    text-align: center;
    letter-spacing: 2px;
    font-weight: bold;
  }
}
</style>
