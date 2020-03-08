import main from '@/components/main'
import pMain from '@/components/parent-view'
const router = {
	path: '/container',
	name: 'container',
	component: main,
	children: [{
		path: '/system',
		name: 'system_index',
		component: pMain,
		meta: {
			language: 'system_manage',
			title: '系统管理',
			is_login: true
		},
		children: [{
			path: 'rights',
			name: 'system_rights',
			component: () => import('@/views/system/rights/index.vue'),
			meta: {
				language: 'rights_manage',
				title: '权限管理',
				is_login: true
			}
		}, {
			path: 'users',
			name: 'system_users',
			component: () => import('@/views/system/user/index.vue'),
			meta: {
				language: 'user_manage',
				title: '用户管理',
				is_login: true
			},
		}, {
			path: 'log',
			name: 'system_log',
			component: pMain,
			meta: {
				language: 'log_manage',
				title: '日志管理',
				is_login: true
			},
			children: [{
				path: 'log_sql',
				name: 'system_log_sql',
				component: pMain,
				meta: {
					language: 'sql_log',
					title: 'SQL日志',
					is_login: true,
					display: 'hidden'
				},
			}, {
				path: 'login_log',
				name: 'system_login_log',
				component: () => import('@/views/system/log/login/index.vue'),
				meta: {
					language: 'login_log',
					title: '登录日志',
					is_login: true
				},
			}]
		}]
	}, {
		path: '/basis',
		name: 'basis_index',
		component: pMain,
		meta: {
			language: 'basis_setting',
			title: '基础设置',
			is_login: true
		},
		children: [{
			path: 'site_info',
			name: 'site_info',
			component: () => import('@/views/basis/site/index.vue'),
			meta: {
				language: 'site_info',
				title: '站点信息',
				is_login: true
			}
		}, {
			path: 'site_link',
			name: 'site_link',
			component: () => import('@/views/basis/link/index.vue'),
			meta: {
				language: 'site_link',
				title: '友情链接',
				is_login: true
			}
		}]
	}, {
		path: '/portal',
		name: 'portal_manage',
		component: pMain,
		meta: {
			language: 'portal_manage',
			title: '门户管理',
			is_login: true
		},
		children: [{
			path: 'nav',
			name: 'nav_manage',
			component: () => import('@/views/protal/nav/index.vue'),
			meta: {
				language: 'nav_manage',
				title: '导航管理',
				is_login: true
			}
		}, {
			path: 'slide',
			name: 'slide_manage',
			component: () => import('@/views/protal/slide/index.vue'),
			meta: {
				language: 'slide_manage',
				title: '幻灯片管理',
				is_login: true
			}
		}, {
			path: 'message',
			name: 'message_manage',
			component: () => import('@/views/protal/message/index.vue'),
			meta: {
				language: 'message_manage',
				title: '留言管理',
				is_login: true
			}
		}, {
			path: 'announcements',
			name: 'announcements',
			component: () => import('@/views/protal/notice/index.vue'),
			meta: {
				language: 'announcements',
				title: '通知公告',
				is_login: true
			}
		}, {
			path: 'article',
			name: 'article_manage',
			component: pMain,
			meta: {
				language: 'article_manage',
				title: '文章管理',
				is_login: true
			},
			children: [{
				path: 'type',
				name: 'article_type',
				component: () => import('@/views/protal/article/type/index.vue'),
				meta: {
					language: 'article_type',
					title: '文章分类',
					is_login: true
				},
			}, {
				path: 'list',
				name: 'article_list',
				component: () => import('@/views/protal/article/data/index.vue'),
				meta: {
					language: 'article_list',
					title: '文章列表',
					is_login: true
				},
			}, {
				path: 'page',
				name: 'article_page',
				component: () => import('@/views/protal/article/page/index.vue'),
				meta: {
					language: 'article_page',
					title: '页面管理',
					is_login: true
				},
			}]
		}]
	}, {
		path: '/plugin',
		name: 'plugin_index',
		redirect: '/plugin/config',
		component: () => import('@/views/plugin/index.vue'),
		meta: {
			language: 'plugin_manage',
			title: '应用管理',
			is_login: true,
			children: false,
			display: 'hidden'
		},
		children: [{
			path: 'config',
			name: 'plugin_index',
			components: {
				capacity: () => import('@/views/plugin/capacity/index.vue'),
				weixin: () => import('@/views/plugin/weixin/index.vue'),
			},
			meta: {
				is_login: true,
				display: 'hidden'
			},
		}]
	}]
}

export default router
