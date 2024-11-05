<template>
  <div class="side-menu">
    <el-menu
      background-color="#1f1f1f"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      unique-opened
      :collapse-transition="false"
      style="border: none;height: 100vh; width:200px; overflow-y: auto;"
    >
      <el-menu-item index="0" @click="navigateTo('/')">
        <i class="el-icon-location"></i>
        <span>總覽</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>場域</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>3F</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              class="field-item"
              index="1-1-0"
              @click="navigateTo('/fields?floor=3&name=yel')"
            >黃光</el-menu-item>
            <el-menu-item
              class="field-item"
              index="1-1-1"
              @click="navigateTo('/fields?floor=3&name=aoi')"
            >AOI</el-menu-item>
            <el-menu-item
              class="field-item"
              index="1-1-2"
              @click="navigateTo('/fields?floor=3&name=mec')"
            >MEC</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="0-2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>4F</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              class="field-item"
              index="1-2-0"
              @click="navigateTo('/fields?floor=4&name=yel')"
            >黃光</el-menu-item>
            <el-menu-item
              class="field-item"
              index="1-2-1"
              @click="navigateTo('/fields?floor=4&name=aoi')"
            >AOI</el-menu-item>
            <el-menu-item
              class="field-item"
              index="1-2-2"
              @click="navigateTo('/fields?floor=4&name=mec')"
            >MEC</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="4" @click="navigateTo('/transfer')">
        <i class="el-icon-location"></i>
        <span>搬運狀態統計</span>
      </el-menu-item>
      <el-menu-item index="1" @click="navigateTo('/equipments')">
        <i class="el-icon-location"></i>
        <span>設備狀態</span>
      </el-menu-item>
      <el-menu-item index="2" @click="navigateTo('/versions')">
        <i class="el-icon-location"></i>
        <span>版本管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="navigateTo('/test')">
        <i class="el-icon-menu"></i>
        <span>Login</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  width: 200px;
}
.menu-title {
  font-size: 22px;
}
.field-item {
  font-size: 18px;
}
</style>
