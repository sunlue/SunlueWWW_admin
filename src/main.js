import Vue from 'vue'
//状态管理
import store from './store'
//读取配置管理
import config from './config'
Vue.prototype.config = config;
Vue.prototype.$assets = config.assets;
Vue.prototype.$upload = config.assets.upload;
//路由管理
import router from './router'
//iview框架

import iView from 'view-design';
import 'view-design/dist/styles/iview.css';

// import iView from 'iview'
// import 'iview/dist/styles/iview.css';

//图表插件
import ECharts from 'vue-echarts'
import themeBigData from '@/assets/echart/theme/big-data.json';
import themeOrdinary from '@/assets/echart/theme/ordinary.json';
ECharts.registerTheme('big-data', themeBigData);
ECharts.registerTheme('ordinary', themeOrdinary);
Vue.component('v-chart', ECharts)
//国际化
import i18n from './locale'
//渲染页面
import App from './App.vue'


Vue.use(iView, {
	transfer: true,
	i18n: (key, value) => i18n.t(key, value)
});
Vue.config.productionTip = false

new Vue({
	i18n,
	store,
	router,
	config,
	render: h => h(App),
}).$mount('#app')
