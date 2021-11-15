import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import '@/assets/styles/app.scss';

const pinia = createPinia();

const app = createApp(App);
app.use(router).use(pinia);
app.mount('#app');
