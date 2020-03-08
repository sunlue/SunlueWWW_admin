import user from '@/api/user'
export default {
	state: {
		isLogin: false,
		userInfo: {},
		userAuth: []
	},
	mutations: {
		SET_LOGIN: (state, data) => {
			state.isLogin = data
		},
		SET_USER_INFO: (state, data) => {
			state.userInfo = data
		},
		SET_USER_AUTH: (state, data) => {
			state.userAuth = data;
		},
		REFRESH_LOGIN: (state, data) => {
			let user_info = JSON.parse(sessionStorage.getItem('user_info'));
			let user_auth = sessionStorage.getItem('user_auth');
			state.isLogin = data;
			state.userInfo = user_info
			state.userAuth = user_auth != 'ALL' ? JSON.parse(user_auth) : user_auth;
		}
	},
	getters: {
		userInfo: state => {
			return state.userInfo;
		},
		userAuth: state => {
			return state.userAuth;
		}
	},
	actions: {
		login({dispatch,commit}, userInfo) {
			return new Promise((resolve, reject) => {
				user.login(userInfo).then(response => {
					const data = response.data
					if (!data.is_manage) {
						commit('SET_USER_AUTH', data.user_auth);
						sessionStorage.setItem('user_auth', JSON.stringify(data.user_auth));
					} else {
						commit('SET_USER_AUTH', 'ALL');
						sessionStorage.setItem('user_auth', 'ALL');
					}
					commit('SET_LOGIN', true);
					commit('SET_USER_INFO', data.user_info);
					sessionStorage.setItem('isLogin', true);
					sessionStorage.setItem('user_info', JSON.stringify(data.user_info));
					resolve(data);
					return dispatch('reset_token',{
						access_token:data.access_token,
						refresh_token:data.refresh_token
					})
				}).catch(error => {
					reject(error)
				})
			})
		},
		exit({commit}, data) {
			return new Promise((resolve, reject) => {
				user.exit(data).then(response => {
					const data = response.data
					commit('SET_LOGIN', false);
					commit('SET_TOKEN', '');
					commit('SET_USER_INFO', {});
					sessionStorage.removeItem('isLogin');
					sessionStorage.removeItem('token');
					sessionStorage.removeItem('user_info');
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateUserPwd({commit},data){
			return new Promise((resolve, reject) => {
				user.updatePwd(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		access_token({commit}){
		}
	}
}
