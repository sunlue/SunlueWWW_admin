import link from '@/api/basis/link'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createLink({commit}, data) {
			return new Promise((resolve, reject) => {
				link.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteLink({}, data) {
			return new Promise((resolve, reject) => {
				link.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateLink({}, data) {
			return new Promise((resolve, reject) => {
				link.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readLink({}, data) {
			return new Promise((resolve, reject) => {
				link.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
