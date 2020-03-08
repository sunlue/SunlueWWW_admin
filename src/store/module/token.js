import token from '@/api/token'
export default {
	state: {
		token: '',
		token_time: 0,
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_TOKEN_TIME: (state, timestamp) => {
			state.token_time = timestamp;
		},
		REFRESH_TOKEN: (state, data) => {
			let token = sessionStorage.getItem('token');
			let token_time = sessionStorage.getItem('token_time');
			state.token = token
			state.token_time = token_time
		}
	},
	getters: {
		token: (state) => {
			return state.token || sessionStorage.getItem('token');
		},
		token_time: state => {
			return state.token_time;
		}
	},
	actions: {
		access_token({
			commit
		}) {
			return new Promise((resolve, reject) => {
				token.access_token(data).then(response => {
					const data = response.data
					commit('SET_TOKEN', '');
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		refresh_token({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				token.refresh(data).then(response => {
					const data = response.data.data
					let timestamp = (new Date()).getTime() + 86400000;
					commit('SET_TOKEN', data.access_token);
					commit('SET_TOKEN_TIME', timestamp);
					sessionStorage.setItem('token', data.access_token);
					sessionStorage.setItem('token_time', timestamp);
					resolve(data.access_token);
				}).catch(error => {
					reject(error)
				})
			})
		},
		reset_token({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				let timestamp = (new Date()).getTime() + 86400000;
				commit('SET_TOKEN', data.access_token);
				commit('SET_TOKEN_TIME', timestamp);
				sessionStorage.setItem('token', data.access_token);
				sessionStorage.setItem('token_time', timestamp);
				resolve();
			}).catch(error => {
				reject(error)
			})
		}
	}
}
