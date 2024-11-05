<template>
  <div class="field d-flex">
    <!-- <div class="field-header">{{ floor }}F {{ name }}</div> -->
    <div class="d-flex flex-column h-100">
      <CardContainer>
        <template #header>系統運轉狀態</template>
        <template>
          <SystemRunModeStatus class="p-2" />
        </template>
      </CardContainer>
      <CardContainer>
        <template #header>系統警報</template>
        <template #default>
          <SystemAlarmGroup class="p-2" />
        </template>
      </CardContainer>
      <CardContainer class="flex-fill">
        <template #header>設備狀態</template>
        <template #default>
          <EquipmentStatus />
        </template>
      </CardContainer>
    </div>
    <div class="flex-fill">
      <div class="d-flex flex-column h-100">
        <CardContainer>
          <template #header>任務列表</template>
          <template #default>
            <TasksList class="px-2" />
          </template>
        </CardContainer>
        <CardContainer class="flex-fill">
          <template #header>Bird View</template>
          <template #default>
            <BirdView class="h-100" :show-vehicle="true" :show-grid="true" />
          </template>
        </CardContainer>
      </div>
    </div>
  </div>
</template>

<script>
import SystemRunModeStatus from './SystemRunModeStatus.vue';
import SystemAlarmGroup from './SystemAlarmGroup.vue';
import EquipmentStatus from './EquipmentStatus.vue';
import TasksList from './TasksList.vue';
import BirdView from './BirdView.vue';
export default {
  components: {
    SystemRunModeStatus,
    SystemAlarmGroup,
    EquipmentStatus,
    TasksList,
    BirdView
  },
  props: {
    floor: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
