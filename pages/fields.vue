<template>
  <div>
    <!-- <EquipmentSelector /> -->
    <Field :floor="floor" :name="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    floor() {
      return this.$route.query.floor
    },
    name() {
      return this.$route.query.name
    }
  }
}
</script>

<style>
</style>
