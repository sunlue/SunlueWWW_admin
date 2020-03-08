import ArticlePage from '@/api/portal/article/page'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createArticlePage({}, data) {
			return new Promise((resolve, reject) => {
				ArticlePage.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteArticlePage({}, data) {
			return new Promise((resolve, reject) => {
				ArticlePage.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateArticlePage({}, data) {
			return new Promise((resolve, reject) => {
				ArticlePage.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readArticlePage({}, data) {
			return new Promise((resolve, reject) => {
				ArticlePage.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
