<template>
  <div class="field d-flex">
    <!-- <div class="field-header">{{ floor }}F {{ name }}</div> -->
    <div class="d-flex flex-column h-100">
      <CardContainer>
        <template #header>系統運轉狀態</template>
        <template>
          <SystemRunModeStatus />
        </template>
      </CardContainer>
      <CardContainer>
        <template #header>系統警報</template>
        <template #default>
          <SystemAlarmGroup />
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
      <CardContainer>
        <template #header>任務統計</template>
        <template #default>
          <SystemAlarmGroup />
        </template>
      </CardContainer>
    </div>
  </div>
</template>

<script>
import SystemRunModeStatus from './SystemRunModeStatus.vue';
import SystemAlarmGroup from './SystemAlarmGroup.vue';
import EquipmentStatus from './EquipmentStatus.vue';
export default {
  components: {
    SystemRunModeStatus,
    SystemAlarmGroup,
    EquipmentStatus
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
