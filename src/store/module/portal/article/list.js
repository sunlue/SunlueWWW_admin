import ArticleList from '@/api/portal/article/list'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createArticleList({}, data) {
			return new Promise((resolve, reject) => {
				ArticleList.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteArticleList({}, data) {
			return new Promise((resolve, reject) => {
				ArticleList.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateArticleList({}, data) {
			return new Promise((resolve, reject) => {
				ArticleList.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readArticleList({}, data) {
			return new Promise((resolve, reject) => {
				ArticleList.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
