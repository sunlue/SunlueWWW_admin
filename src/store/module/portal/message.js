import message from '@/api/portal/message'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createMsg({}, data) {
			return new Promise((resolve, reject) => {
				message.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteMsg({}, data) {
			return new Promise((resolve, reject) => {
				message.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		replyMsg({}, data) {
			return new Promise((resolve, reject) => {
				message.reply(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readMsg({}, data) {
			return new Promise((resolve, reject) => {
				message.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
