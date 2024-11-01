<template>
  <div class="equipments">
    <EquipmentSelector @equipment-selected="handleEquipmentSelected" />
    <AGVStatus v-if="selectedEquipment.eqType == 0"></AGVStatus>
  </div>
</template>
<script>

import AGVStatus from '../components/EquipmentStatus/AGVStatus.vue';

export default {
  components: {
    AGVStatus,
  },
  name: 'IndexPage',
  data() {
    return {
      loading: false,
      isCollapse: true,
      test: 0,
      selectedEquipment: {
        floor: 0,
        field: '',
        eqName: '',
        eqType: 0
      }
    }
  },
  computed: {
    realTimeEquipmentStatus() {
      return this.$store.state.signalr.realTimeEquipmentStatus;
    }
  },
  mounted() {
    setInterval(() => {
      this.test++;
    }, 1000);
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEquipmentSelected(equipment) {
      console.info('handleEquipmentSelected', equipment);
      this.selectedEquipment = equipment;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 400);

    }
  },
}
</script>

<style lang="scss" scoped>
.home {
}
</style>
