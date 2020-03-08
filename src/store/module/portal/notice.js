import notice from '@/api/portal/notice'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createNotice({}, data) {
			return new Promise((resolve, reject) => {
				notice.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteNotice({}, data) {
			return new Promise((resolve, reject) => {
				notice.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateNotice({}, data) {
			return new Promise((resolve, reject) => {
				notice.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		releaseNotice({}, data) {
			return new Promise((resolve, reject) => {
				notice.release(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readNotice({}, data) {
			return new Promise((resolve, reject) => {
				notice.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
