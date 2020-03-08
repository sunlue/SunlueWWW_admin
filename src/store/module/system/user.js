import user from '@/api/system/user'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createUser({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				user.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteUser({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				user.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateUser({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				user.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readUser({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				user.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		resetUserPwd({commit},data){
			return new Promise((resolve, reject) => {
				user.reset(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		userAuth({commit},data){
			return new Promise((resolve,reject)=>{
				user.auth(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteUserAuth({commit},data){
			return new Promise((resolve,reject)=>{
				user.deleteAuth(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
