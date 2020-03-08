import site from '@/api/basis/site'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		submitSite({}, data) {
			return new Promise((resolve, reject) => {
				site.submit(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readSite({}, data) {
			return new Promise((resolve, reject) => {
				site.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
