<template>
  <div class="transfer">
    <div class="flex-fill">
      <BirdView :show-vehicle="false" :show-grid="true" />
    </div>
  </div>
</template>

<script>
import BirdView from '@/components/Field/BirdView.vue';
export default {
  name: 'TransferStatus',
  components: {
    BirdView
  }
}
</script>

<style lang="scss" scoped>
.transfer {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
