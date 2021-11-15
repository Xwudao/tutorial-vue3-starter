<script lang="ts" setup="setup">
  //vue3.2，
  const props = defineProps<{
    icon: string;
  }>();
</script>

<template>
  <span class="iconify" :data-icon="props.icon"></span>
</template>

<style lang="scss" scoped></style>
