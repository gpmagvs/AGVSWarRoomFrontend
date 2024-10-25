<template>
  <div class="equipments">
    <EquipmentSelector />equipments
  </div>
</template>
<script>

export default {
  name: 'IndexPage',
  data() {
    return {
      isCollapse: true
    }
  },
  computed: {

  },
  mounted() {

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
