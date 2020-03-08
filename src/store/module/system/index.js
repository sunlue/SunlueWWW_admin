import init from '@/api/system/init'
export default {
	state: {
		systemInfo:{}
	},
	mutations: {
		SET_SYSTEM_INFO: (state, data) => {
			state.systemInfo = data
		},
		REFRESH_SYSTEM_INFO: (state, data) => {
			let system_info = JSON.parse(sessionStorage.getItem('system_info'));
			state.systemInfo = system_info
		}
	},
	getters: {
		systemInfo: state => {
			return state.systemInfo;
		}
	},
	actions: {
		systemInit({commit}, data) {
			return new Promise((resolve, reject) => {
				init.init(data).then(response => {
					const data = response.data;
					commit('SET_SYSTEM_INFO', data);
					sessionStorage.setItem('system_info', JSON.stringify(data));
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
