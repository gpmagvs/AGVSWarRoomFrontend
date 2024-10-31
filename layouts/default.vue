<template>
  <div class="h-100">
    <Header v-if="!loading" @toggleSidebar="toggleSidebar" />
    <div class="d-flex h-100">
      <SideMenu v-if="!loading" v-show="!isCollapse" :isCollapse="isCollapse" />
      <div
        v-if="loading"
        class="main-content-body p-2"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100vw; height: calc(100vh - 60px)"
      ></div>
      <div v-else class="flex-fill p-2">
        {{ $route.name }}
        <keep-alive>
          <nuxt />
        </keep-alive>
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
        this.$store.dispatch('signalr/stopConnection');
        setTimeout(() => {
          if (newRoute.name === 'equipments') {
            console.log('Route changed:', newRoute);
            const floor = newRoute.query.floor;
            const field = newRoute.query.field;
            const equipment = newRoute.query.equipment;
            console.log('newRoute query', floor, field, equipment);
            this.$store.dispatch('signalr/startEquipmentsStateConnection', { floor: floor, field: field, equipment: equipment });
          }
        }, 200);
      },
      { deep: true, immediate: true }
    );

    setTimeout(() => {
      this.loading = false;
    }, 200);
  }
}
</script>

<style scoped>
.main-content {
  height: 100%;
}
</style>
