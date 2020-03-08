import region from '@/api/common/region'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readRegion({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				region.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readRegionChild({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				region.child(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
