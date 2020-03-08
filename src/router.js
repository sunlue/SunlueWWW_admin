import Vue from 'vue'
import Router from 'vue-router'
import i18n from './locale'
import iView from 'iview';
import store from './store'
import route from '@/router/index'
Vue.use(Router)
const router = new Router({
	mode: 'history',
	routes: route
})
router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	if (to.meta.is_login) {
		var isLogin = sessionStorage.getItem('isLogin');
		if (isLogin) {
			let userAuth = sessionStorage.getItem('user_auth');
			if (userAuth != 'ALL') {
				if (JSON.parse(userAuth).indexOf(to.name) < 0 && to.name != "main_index") {
					iView.Message.error({
						content: i18n.t('unauthorized'),
						duration: 5
					})
					next({
						name: 'main_index'
					});
				} else {
					store.commit('REFRESH_LOGIN', true)
					store.commit('REFRESH_TOKEN', true)
					store.commit('REFRESH_SYSTEM_INFO')
					next();
				}
			} else {
				store.commit('REFRESH_LOGIN', true)
				store.commit('REFRESH_TOKEN', true)
				store.commit('REFRESH_SYSTEM_INFO')
				next();
			}
		} else {
			next({
				name: 'login'
			})
		}
	} else {
		next();
	}
})
router.afterEach(() => {
	iView.LoadingBar.finish();
});
export default router
