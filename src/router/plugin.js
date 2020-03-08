import main from '@/components/b2c'
import pMain from '@/components/parent-view'
export default {
	path: '/b2c',
	name: 'b2c_index',
	component: main,
	children: [{
		name: 'b2c_goods',
		path: 'goods',
		component: () => import('@/views/plugin/b2c/goods/index.vue'),
		meta: {
			title: '商品管理',
			is_login: true
		},
		children:[{
			name: 'b2c_goods_goods',
			path: 'goods',
			components: {
				goods:() => import('@/views/plugin/b2c/goods/goods/index.vue'),
				category:() => import('@/views/plugin/b2c/goods/category/index.vue')
			},
			meta: {
				title: '商品管理',
				is_login: true
			},
		}]
	}]
}
