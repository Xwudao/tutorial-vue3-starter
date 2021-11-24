<script lang="ts" setup="setup">
  import { Plus } from '@element-plus/icons';
  import { reactive, ref } from 'vue';
  import useUser from '@/hooks/api/useUser';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import useWidth from '@/hooks/useWidth';

  const emits = defineEmits(['refresh']);

  const visible = ref(false);
  const formData = reactive({
    username: '',
    password: '',
    email: '',
  });
  const rules = {
    username: [{ required: true, message: '用户名必填' }],
    password: [{ required: true, message: '密码必填' }],
    email: [
      { required: true, message: '邮箱必填' },
      { type: 'email', message: '邮箱格式不准确' },
    ],
  };
  const formEl = ref<HTMLFormElement | null>(null);
  const { useUserAdd } = useUser();
  const handleSubmit = () => {
    formEl.value!.validate().then(async (ok: boolean) => {
      if (!ok) return;

      useUserAdd(formData).then((res) => {
        if (res.code === OK_CODE) {
          ElMessage.success(res.msg);
          emits('refresh');
          visible.value = false;
        } else {
          ElMessage.error(res.msg);
        }
      });
    });
  };
  const { width } = useWidth(400, 15);
</script>

<template>
  <el-button size="small" type="primary" @click="visible = true">
    <el-icon><plus /></el-icon>
    添加
  </el-button>
  <el-dialog title="添加用户" :width="`${width}px`" v-model:model-value="visible">
    <el-form
      size="small"
      :model="formData"
      :rules="rules"
      @submit.prevent="handleSubmit"
      ref="formEl"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model:model-value="formData.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model:model-value="formData.password" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="邮箱" v-model:model-value="formData.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-full" native-type="submit">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
