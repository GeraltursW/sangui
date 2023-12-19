import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import store from './store'
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts/core';

// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import i18n from './utils/i18n'

const app = createApp(App)
app.config.globalProperties.getEnv = import.meta.env
app.use(store)
app.use(router);
app.use(i18n)
app.use(ElementPlus,
    //     {
    //     locale: zhCn,
    // }
)
app.component('Echarts',echarts)
// 挂载实例
app.mount('#app');