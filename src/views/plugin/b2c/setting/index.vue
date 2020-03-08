<template>
	<Layout class="ivu-layout-has-sider">
		<left :menu="menu"></left>
		<Content tag="b2c_setting">
			<!-- <site></site> -->
			<router-view class="view two" name="site"></router-view>
		</Content>
	</Layout>
</template>

<script>
	import left from '@/components/b2c/sider.vue'
	import site from './pages/site.vue'
	export default{
		components: {
			left,
			site
		},
		data() {
			return {
				menu: [{
					name:'site_setting',
					title:'站点设置'
				},{
					name:'help_deal',
					title:'帮助协议'
				},{
					name:'payment',
					title:'支付/收款'
				},{
					name:'notice_setting',
					title:'通知设置'
				},{
					name:'order_setting',
					title:'订单设置'
				},{
					name:'area_setting',
					title:'地区设置'
				},{
					name:'union_setting',
					title:'三方账号'
				},{
					name:'search_setting',
					title:'搜索设置'
				},{
					name:'goods_setting',
					title:'商品设置'
				},]
			}
		},
	}
</script>

<style lang="less">
	div[tag="b2c_setting"]{
		height: 100%;
		padding: 10px;
	}
</style>
