import ArticleType from '@/api/portal/article/type'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createArticleType({}, data) {
			return new Promise((resolve, reject) => {
				ArticleType.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteArticleType({}, data) {
			return new Promise((resolve, reject) => {
				ArticleType.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateArticleType({}, data) {
			return new Promise((resolve, reject) => {
				ArticleType.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readArticleType({}, data) {
			return new Promise((resolve, reject) => {
				ArticleType.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
