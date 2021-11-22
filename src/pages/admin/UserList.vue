<script lang="ts" setup="setup">
  import { reactive, ref, toRef } from 'vue';
  import AdminCardBox from '@/components/common/AdminCardBox.vue';
  import useUser from '@/hooks/api/useUser';
  import { formDate } from '@/app/utils';
  import AddUser from '@/pages/admin/userList/AddUser.vue';
  import { Delete } from '@element-plus/icons';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';

  const columns = [
    {
      label: 'ID',
      prop: 'id',
    },
    {
      label: 'Username',
      prop: 'username',
    },
    {
      label: 'Role',
      prop: 'role',
    },
    {
      label: 'Email',
      prop: 'email',
    },
  ];

  const formParam = reactive({ page: 1, size: 10 });

  const { useList, useUserDel } = useUser();
  const { refresh, list, total, loading } = useList(
    toRef(formParam, 'page'),
    toRef(formParam, 'size'),
    true
  );
  //composition api, vuex, pinia 98% typescript

  const handlePageChanged = (p: number) => {
    formParam.page = p;
  };
  const handleDel = (id: number) => {
    useUserDel(id).then(({ code, msg }) => {
      if (code === OK_CODE) {
        ElMessage.success(msg);
        list.value = list.value.filter((item) => item.id != id);
        return;
      }
      ElMessage.error(msg);
    });
  };
</script>

<template>
  <div class="h-full w-full">
    <admin-card-box>
      <template #header>
        <div class="flex justify-between">
          <h4 class="font-bold text-xl">用户列表</h4>
          <div>
            <add-user @refresh="refresh" />
          </div>
        </div>
      </template>
      <template #default>
        <el-table :data="list" v-loading="loading">
          <el-table-column
            v-for="(item, i) in columns"
            :key="i"
            :label="item.label"
            :prop="item.prop"
          ></el-table-column>
          <el-table-column label="CreateTime" prop="create_time">
            <template #default="{ row }">
              <span>{{ formDate(row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operation">
            <template #default="{ row }">
              <el-popconfirm title="Are you sure to delete this?" @confirm="handleDel(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" circle>
                    <el-icon>
                      <delete />
                    </el-icon>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <div class="w-full my-2">
          <el-pagination
            :total="total"
            background
            :page-size="formParam.size"
            :current-page="formParam.page"
            @current-change="handlePageChanged"
          />
        </div>
      </template>
    </admin-card-box>
  </div>
</template>

<style lang="scss" scoped></style>
