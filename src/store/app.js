import routers from '@/router/router.js'
const app = {
	state: {
		menu: [],
		language: 'zh-CN'
	},
	mutations: {
		SET_MENU(state, data) {
			state.menu = data
		},
		SET_LANGUAGE(state, data) {
			state.language = data
		},
	},
	actions: {
		getNavMenu({commit}) {
			return new Promise((resolve) => {
				let userAuth = this.getters.userAuth;
				function filter(routers) {
					let userAuthRoute = [];
					routers.forEach(function(router) {
						if (userAuth.indexOf(router.name) >= 0) {
							if (router.children) {
								let childRes = filter(router.children);
								router['children'] = '';
								if (childRes) {
									router['children']=(childRes);
								}
							}
							userAuthRoute.push(router);
						}
					})
					return userAuthRoute;
				}
				if(userAuth=='ALL'){
					commit('SET_MENU', routers['children']);
					resolve(routers['children']);
				}else{
					let userAuthRoute = filter(routers['children']);
					commit('SET_MENU', userAuthRoute);
					resolve(userAuthRoute);
				}
			})
		}
	},
	getters: {
		language: state => {
			return state.language;
		}
	}
}
export default app;
