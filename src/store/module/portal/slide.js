import slide from '@/api/portal/slide'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
