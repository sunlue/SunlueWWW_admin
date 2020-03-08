import nation from '@/api/common/nation'
export default {
	state: {
		nation: ''
	},
	mutations: {
		SET_NATION: (state, data) => {
			state.nation = data
		},
	},
	getters: {
		nation: (state) => {
			return state.nation || sessionStorage.getItem('nation');
		}
	},
	actions: {
		readNation({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				nation.read(data).then(response => {
					const data = response.data;
					commit('SET_NATION', data.access_token);
					sessionStorage.setItem('nation', data);
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
