import nav from '@/api/portal/nav'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createNav({}, data) {
			return new Promise((resolve, reject) => {
				nav.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteNav({}, data) {
			return new Promise((resolve, reject) => {
				nav.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateNav({}, data) {
			return new Promise((resolve, reject) => {
				nav.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readNav({}, data) {
			return new Promise((resolve, reject) => {
				nav.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
