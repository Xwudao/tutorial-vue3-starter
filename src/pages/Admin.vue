<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue';
  import { computed, ref } from 'vue';
  import { Location, Menu as IconMenu, Setting, Document } from '@element-plus/icons';

  const asideWidth = ref('200px');

  const handleAsideChange = () => {
    asideWidth.value = asideWidth.value === '200px' ? '60px' : '200px';
  };
  const collapse = computed(() => {
    return asideWidth.value !== '200px';
  });
</script>

<template>
  <el-container class="wrapper">
    <el-aside :width="asideWidth" class="left-aside">
      <div class="aside-logo">
        <div class="text">{{ collapse ? '无' : '后台模板' }}</div>
      </div>
      <!--      <div class="aside-menus">-->
      <transition name="el-fade-in-linear">
        <el-menu default-active="2" :collapse="collapse" class="aside-menus transition-all">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item one</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
          <!--          <el-menu-item index="4">-->
          <!--            <el-icon><setting /></el-icon>-->
          <!--            <span>Navigator Four</span>-->
          <!--          </el-menu-item>-->
          <!--          <el-menu-item index="4">-->
          <!--            <el-icon><setting /></el-icon>-->
          <!--            <span>Navigator Four</span>-->
          <!--          </el-menu-item>-->
          <!--          <el-menu-item index="4">-->
          <!--            <el-icon><setting /></el-icon>-->
          <!--            <span>Navigator Four</span>-->
          <!--          </el-menu-item>-->
          <!--          <el-menu-item index="4">-->
          <!--            <el-icon><setting /></el-icon>-->
          <!--            <span>Navigator Four</span>-->
          <!--          </el-menu-item>-->
          <!--          <el-menu-item index="4">-->
          <!--            <el-icon><setting /></el-icon>-->
          <!--            <span>Navigator Four</span>-->
          <!--          </el-menu-item>-->
        </el-menu>
      </transition>
      <!--      </div>-->
    </el-aside>
    <el-container class="right-wrapper">
      <el-header class="right-header">
        <div class="header-left">
          <div @click="handleAsideChange" v-if="asideWidth === '200px'">
            <app-icon icon="ant-design:menu-fold-outlined" class="text-xl cursor-pointer" />
          </div>
          <div @click="handleAsideChange" v-else>
            <app-icon icon="ant-design:menu-unfold-outlined" class="text-xl cursor-pointer" />
          </div>
        </div>
        <div class="header-right">
          <div class="avatar cursor-pointer">
            <el-dropdown trigger="click" size="small">
              <el-avatar
                alt="Avatar"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="right-main">
        Main

        <!--        <router-view />-->
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
  .wrapper {
    @apply h-full w-full;
  }

  .left-aside {
    @apply h-full bg-gray-100 flex flex-col;
    .aside-logo {
      @apply text-center h-10 select-none;
      .text {
        @apply text-center text-base font-bold py-2 px-4 bg-gray-700 text-white;
      }
    }
    .aside-menus {
      height: calc(100% - 2.5rem);
      overflow-y: auto;
      overflow-x: hidden;
      //@apply ;
    }
  }
  .right-wrapper {
    @apply flex-1;
  }

  .right-header {
    @apply bg-indigo-200 flex items-center justify-between;

    .header-left {
      @apply flex;
    }
    .header-right {
      @apply flex;
    }
  }

  .right-main {
    @apply bg-green-300;
  }
</style>
