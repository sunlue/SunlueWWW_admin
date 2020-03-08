import log from '@/api/system/log'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readLogLogin({commit}, data) {
			return new Promise((resolve, reject) => {
				log.login(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
