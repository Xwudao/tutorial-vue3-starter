import { defineStore } from 'pinia';

export interface UserInfo {
  id: number;
  username: string;
  role: string;
  email: string;
  token: string;
}
export const KEY_USER_ID = 'user';
const useUserStore = defineStore({
  id: KEY_USER_ID,
  state: (): Partial<UserInfo> => ({
    id: -1,
    username: '',
    role: '',
    email: '',
    token: '',
  }),

  actions: {
    setToken(token: string) {
      this.$state.token = token;
    },
    setID(id: number) {
      this.$state.id = id;
    },
    setRole(role: string) {
      this.$state.role = role;
    },
    logout() {
      this.$state = {};
    },
    login(user: Partial<UserInfo>) {
      this.$state = {
        ...this.$state,
        ...user,
      };
    },
  },
});

//create
const instance = useUserStore();

instance.$subscribe((mutation, state) => {
  localStorage.setItem(instance.$id, JSON.stringify(state));
});

//init
const val = localStorage.getItem(instance.$id);
if (val) {
  instance.login(JSON.parse(val));
}

export default useUserStore;
