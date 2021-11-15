<script lang="ts" setup="setup">
  import { storeToRefs } from 'pinia';
  import useCountStore from '@/store/modules/useCountStore';

  const countStore = useCountStore();
  const refCount = storeToRefs(countStore);
</script>

<template>
  <div>count: {{ countStore.num }}</div>
  <div>count: {{ refCount.num }}</div>
  <div>
    <!--    <button @click="refCount.num++">+1</button>-->
  </div>
  <div><button @click="countStore.increment()">+1</button></div>
</template>

<style lang="scss" scoped></style>
