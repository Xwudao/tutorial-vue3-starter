<script lang="ts" setup="setup">
  import { storeToRefs } from 'pinia';
  import useCountStore from '@/store/modules/useCountStore';
  import AppIcon from '@/components/common/AppIcon.vue';

  const countStore = useCountStore();
  const refCount = storeToRefs(countStore);
</script>

<template>
  <div class="mx-10">
    <div>count: {{ countStore.num }}</div>
    <div>count: {{ refCount.num }}</div>
    <div>
      <!--    <button @click="refCount.num++">+1</button>-->
    </div>
    <div>
      <el-button>Ok!!</el-button>
    </div>
    <!--  <span class="iconify" data-icon="akar-icons:search"></span>-->
    <app-icon icon="akar-icons:search" />
    <app-icon icon="mdi:abjad-hebrew" />
    <app-icon icon="el-search" />
    <div>
      <button class="bg-green-300 text-white rounded px-2 py-1" @click="countStore.increment()">
        +1
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
