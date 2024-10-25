<template>
  <div class="h-100">
    <Header @toggleSidebar="toggleSidebar" />
    <div class="d-flex h-100">
      <SideMenu v-show="!isCollapse" :isCollapse="isCollapse" />
      <div
        v-if="loading"
        class="main-content-body p-2"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100vw; height: calc(100vh - 60px)"
      ></div>
      <div v-else class="flex-fill">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import SideMenu from '~/components/SideMenu.vue';

export default {
  components: {
    Header,
    SideMenu
  },
  data() {
    return {
      loading: true,
      isCollapse: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    this.$watch(
      () => this.$route,
      (newRoute, oldRoute) => {
        console.log('Route changed:', newRoute);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      },
      { deep: true, immediate: true }
    );
  }
}
</script>

<style scoped>
.main-content {
  height: 100%;
}
</style>
