import capacity from '@/api/plugin/capacity'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		submitCapacity({commit}, data) {
			return new Promise((resolve, reject) => {
				capacity.submit(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readCapacity({commit}, data) {
			return new Promise((resolve, reject) => {
				capacity.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
