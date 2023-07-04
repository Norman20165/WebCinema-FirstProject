import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

createApp(App).use(router).mount('#app')