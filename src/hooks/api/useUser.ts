import { ref, Ref, watch } from 'vue';
import { RegParams, reqUserAdd, reqUserDel, reqUserList, UserInfo } from '@/api/userApi';
import { OK_CODE } from '@/app/keys';

//hooks
const useUser = () => {
  const useList = (page: Ref<number>, size: Ref<number>, immediate = false) => {
    const list = ref<UserInfo[]>([]);
    const total = ref(0);
    const loading = ref(false);

    const refresh = async () => {
      loading.value = true;
      let { data, code } = await reqUserList(page.value, size.value);
      loading.value = false;
      if (code === OK_CODE) {
        list.value = data.list || [];
        total.value = data.total || 0;
      }
    };

    watch(
      [page, size],
      async () => {
        await refresh();
      },
      { immediate }
    );

    return {
      loading,
      list,
      total,
      refresh,
    };
  };

  const useUserAdd = (data: RegParams) => {
    return reqUserAdd(data);
  };
  const useUserDel = (id: number) => {
    return reqUserDel(id);
  };
  return {
    useUserDel,
    useList,
    useUserAdd,
  };
};

export default useUser;
