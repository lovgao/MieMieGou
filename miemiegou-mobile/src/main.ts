// import './assets/main.css'
import '@/assets/css/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// pinia的持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from './App.vue'
import router from './router'

// Vant 中有个别组件是以函数的形式提供的，插件无法自动引入对应的样式，因此需要手动引入样式。
import 'vant/es/toast/style'
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

const app = createApp(App)

app.use(createPinia())
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
