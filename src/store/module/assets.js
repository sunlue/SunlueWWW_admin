import assets from '@/api/assets'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		deleteAssets({commit},data) {
			return new Promise((resolve, reject) => {
				assets.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteArticleFileAssets({commit},data) {
			return new Promise((resolve, reject) => {
				assets.deleteArticleFile(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteArticleImageAssets({commit},data) {
			return new Promise((resolve, reject) => {
				assets.deleteArticleImage(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
