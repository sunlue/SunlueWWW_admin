import routes from './router.js'
import plugin from './plugin.js'

export const pages = [{
	path: '/login',
	name: 'login',
	component: () => import('@/views/login.vue')
}, {
	path: '/',
	redirect: '/main/index',
	component: () => import('@/components/main'),
	children: [{
		path: '/main',
		name: 'main',
		redirect: '/main/index',
		component: () => import('@/views/index/index'),
		meta: {
			is_login: true
		},
		children: [{
			path: 'index',
			name: 'main_index',
			components: {
				capacity: () => import('@/views/plugin/capacity/index.vue'),
				weixin: () => import('@/views/plugin/weixin/index.vue'),
			},
			meta: {
				title: '控制台',
				is_login: true
			}
		}]
	}]
}, routes, plugin]
export default pages
