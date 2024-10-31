<template>
  <div class="equipments">
    <EquipmentSelector />
    {{ test }}
    <AGVStatus></AGVStatus>
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
      isCollapse: true,
      test: 0
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
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
}
</style>
