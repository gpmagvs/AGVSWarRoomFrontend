<template>
  <div class="home">{{ test }}</div>
</template>
<script>

export default {
  name: 'HomePage',
  data() {
    return {
      isCollapse: true,
      test: 0
    }
  },
  computed: {

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
  width: 100vw;
  height: 100vh;
}
</style>
