import plugin from '@/api/plugin/index'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readPlugin({commit}, data) {
			return new Promise((resolve, reject) => {
				plugin.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		installPlugin({commit}, data) {
			return new Promise((resolve, reject) => {
				plugin.install(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		uninstallPlugin({commit}, data) {
			return new Promise((resolve, reject) => {
				plugin.uninstall(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		statePlugin({commit}, data){
			return new Promise((resolve, reject) => {
				plugin.state(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
