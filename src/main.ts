import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';

import 'element-plus/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import axios from 'axios'
import VueAxios from 'vue-axios'

import * as echarts from 'echarts'
const app = createApp(App)
app.use(store).use(router).use(ElementPlus, { locale })
app.use(VueAxios, axios) 
app.config.globalProperties.$echarts = echarts
app.mount('#app')