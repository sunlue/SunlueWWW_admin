import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'
import store from '@/store.js'
import config from '../config'
import i18n from '@/locale'
let apiURL = config.api.url(process.env.NODE_ENV);
// 创建一个axios请求
const service = axios.create({
	baseURL: apiURL, // api 的 base_url
	timeout: 10000, // 超时时间
	params: {}
})

// 请求拦截
service.interceptors.request.use(
	config => {
		let access_time = store.getters.token_time;
		if ((new Date()).getTime() > access_time && access_time > 0) {
			store.dispatch('refresh_token', store.getters.token).then((access_token) => {
				config.headers['access_token'] = access_token
			})
		} else {
			config.headers['access_token'] = store.getters.token
		}
		config.onUploadProgress = function() {
			iView.LoadingBar.start();
		}
		if (config.params) {
			config.params['lang'] = i18n.locale;
		} else {
			config.params = {
				lang: i18n.locale
			};
		}
		return config
	},
	error => {
		iView.Message.error({
			content: error.message,
			duration: 5
		})
		return Promise.reject(error)
	}
)
//响应拦截
service.interceptors.response.use(
	response => {
		const result = response.data;
		if (result.code !== 200) {
			if (result.info != '' && result.info != undefined) {
				iView.Message.warning({
					content: result.info,
					duration: 3
				});
			}
			iView.LoadingBar.error();
			return Promise.reject({
				code:result.code
			})
		} else {
			iView.LoadingBar.finish();
			return result;
		}
	},
	error => {
		iView.Message.error({
			content: error.message,
			duration: 5
		})
		iView.LoadingBar.error();
		return Promise.reject(error)
	}
)

export default service;
