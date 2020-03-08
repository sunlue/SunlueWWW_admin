import config from '@/api/plugin/config'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		submitPluginConfig({commit}, data) {
			return new Promise((resolve, reject) => {
				config.submit(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readPluginConfig({commit}, data) {
			return new Promise((resolve, reject) => {
				config.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		installPlugin({commit}, data) {
			return new Promise((resolve, reject) => {
				config.install(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
