import { ref, Ref, watch } from 'vue';
import { reqUserList, UserInfo } from '@/api/userApi';
import { OK_CODE } from '@/app/keys';

//hooks
const useUser = () => {
  const useList = (page: Ref<number>, size: Ref<number>, immediate = false) => {
    const list = ref<UserInfo[]>([]);
    const total = ref(0);

    const refresh = async () => {
      let { data, code } = await reqUserList(page.value, size.value);
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
      list,
      total,
      refresh,
    };
  };

  return {
    useList,
  };
};

export default useUser;
