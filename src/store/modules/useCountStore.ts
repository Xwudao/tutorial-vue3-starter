import { defineStore } from 'pinia';

const useCountStore = defineStore({
  id: 'count',
  state: () => ({ num: 1 }),
  actions: {
    increment() {
      this.num += 1;
    },
  },
});

//store
const instance = useCountStore();

//save
instance.$subscribe((_, state) => {
  localStorage.setItem('count-store', JSON.stringify({ ...state }));
});
//get
const old = localStorage.getItem('count-store');
if (old) {
  instance.$state = JSON.parse(old);
}

export default useCountStore;
