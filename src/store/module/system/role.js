import role from '@/api/system/role'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createRole({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				role.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteRole({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				role.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateRole({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				role.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		rightsRole({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				role.rights(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readRole({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				role.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		roleUserAuth({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				role.userAuth(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
