<script lang="ts" setup="setup">
  import { reactive, ref, toRef } from 'vue';
  import AdminCardBox from '@/components/common/AdminCardBox.vue';
  import useUser from '@/hooks/api/useUser';
  import { formDate } from '@/app/utils';

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

  const { useList } = useUser();
  const { list, total } = useList(toRef(formParam, 'page'), toRef(formParam, 'size'), true);
  //composition api, vuex, pinia 98% typescript

  const handlePageChanged = (p: number) => {
    formParam.page = p;
  };
</script>

<template>
  <div class="h-full w-full">
    <admin-card-box>
      <template #header>
        <h4 class="font-bold text-xl">用户列表</h4>
      </template>
      <template #default>
        <el-table :data="list">
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
