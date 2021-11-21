<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue';
  import { reqUserLogin } from '@/api/userApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import useUserStore from '@/store/modules/useUserStore';

  const userInfo = reactive({
    username: '',
    password: '',
  });
  const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  };
  const formEl = ref<HTMLFormElement | null>(null);
  const router = useRouter();
  const userStore = useUserStore();
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    formEl.value!.validate().then(async (ok: boolean) => {
      if (!ok) return;
      try {
        let { code, data, msg } = await reqUserLogin(userInfo);
        if (code === OK_CODE) {
          ElMessage.success(msg);
          userStore.login(Object.assign({}, data.info, { token: data.token }));
          router.push({ name: 'Dashboard' });
          return;
        }
        ElMessage.error(msg);
      } catch (e) {
        ElMessage.error(e as string);
      }
    });
  };
</script>

<template>
  <div class="login h-screen w-screen flex justify-center items-center bg-gray-100">
    <div class="login-wrapper w-full sm:w-80 p-4 bg-white shadow-md rounded">
      <div class="title font-bold text-lg border-b border-gray-200 pb-1 mb-2">系统登录</div>
      <div class="p-2">
        <el-form size="small" :model="userInfo" :rules="rules" @submit="handleSubmit" ref="formEl">
          <el-form-item prop="username">
            <el-input placeholder="用户名" v-model:model-value="userInfo.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model:model-value="userInfo.password" />
          </el-form-item>
          <el-form-item>
            <!--
<button type="submit"></button>
-->
            <el-button class="w-full" type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
