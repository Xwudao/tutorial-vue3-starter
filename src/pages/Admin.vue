<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue';
  import { computed, ref } from 'vue';
  import { Setting, UserFilled } from '@element-plus/icons';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';

  const asideWidth = ref('200px');

  const handleAsideChange = () => {
    asideWidth.value = asideWidth.value === '200px' ? '60px' : '200px';
  };
  const collapse = computed(() => {
    return asideWidth.value !== '200px';
  });
  const router = useRouter();
  //hooks, vue 全面ts, hook react，解耦
  const handleMenuChange = (index: string) => {
    switch (index) {
      case '1':
        router.push({ name: 'Dashboard' });
        break;
      case '2-1':
        router.push({ name: 'UserList' });
        break;
    }
  };
  const handleSelect = (c: string) => {
    switch (c) {
      case 'logout':
        router.push({ name: 'Login' });
        ElMessage.info('退出成功')
        break;
    }
  };
  //axios,
</script>

<template>
  <el-container class="wrapper">
    <el-header class="top-header">
      <div class="left-header">
        <div class="text-black flex items-center" @click="handleAsideChange">
          <app-icon icon="ant-design:menu-fold-outlined" class="text-2xl cursor-pointer" />
        </div>
        <div class="site-title">无道后台管理系统</div>
      </div>
      <div class="right-header">
        <el-dropdown size="small" @command="handleSelect">
          <span class="el-dropdown-link">
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="edit-password">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="main">
      <el-aside :width="asideWidth" class="left-aside">
        <el-menu
          default-active="2"
          class="left-menu"
          :collapse="collapse"
          @select="handleMenuChange"
        >
          <el-menu-item index="1">
            <el-icon><setting /></el-icon>
            <span>控制面板</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><user-filled /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="2-1">
              <span>用户列表</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
  .wrapper {
    @apply h-full w-full;
  }
  .top-header {
    @apply bg-gray-100 flex items-center justify-between;

    .left-header {
      @apply flex;
    }
    .site-title {
      @apply font-bold ml-3 text-lg select-none;
    }
  }
  .main {
    height: calc(100% - 60px);
    @apply overflow-y-auto bg-gray-200;
  }
  .left-aside {
    @apply bg-gray-100 transition-all;

    .left-menu {
      @apply h-full overflow-x-hidden;
    }
  }
</style>
