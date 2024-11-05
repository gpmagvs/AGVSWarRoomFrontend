<template>
  <header class="app-header d-flex justify-content-between align-items-center">
    <div class="header-left d-flex">
      <div @click="toggleSidebar" class="cursor-pointer">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" style="font-size: 30px;"></i>
      </div>
      <div class="nav-breadcrumb-container">
        <el-breadcrumb class="w-100" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">AGVS戰情室</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.name !== 'home'">{{ $route.meta.alias }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- <el-button class="toggle-btn" icon="el-icon-s-fold" @click="toggleSidebar"></el-button> -->
    </div>
    <div class="header-center">
      <!-- <h1 class="app-title">{{ title }}</h1> -->
    </div>
    <div class="header-right">
      <!-- You can add additional header elements here if needed -->
      <div class="d-flex align-items-center mx-2">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>個人資料</el-dropdown-item>
            <el-dropdown-item>設定</el-dropdown-item>
            <el-dropdown-item divided>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
  },
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
      this.$emit('toggleSidebar');
      this.$store.commit('SET_COLLAPSE', this.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  width: 100vw;
  height: 50px;
  background-color: #0a0a0a;
  color: #fff;
  padding: none;
  .header-left {
    padding-left: 20px;
    div {
      width: 30px;
      // background-color: #1a1a1a;
    }
    .nav-breadcrumb-container {
      padding-left: 20px;
      width: 220px;
      padding-top: 7px;
    }
  }
  .app-title {
    font-size: 20px;
  }
}
</style>
