<template>
	<Layout class="ivu-layout-has-sider">
		<left :menu="menu"></left>
		<Content tag="b2c_setting">
			<router-view name="goods"></router-view>
			<router-view name="category"></router-view>
		</Content>
	</Layout>
</template>

<script>
	import left from '@/components/b2c/sider.vue'
	import goods from './goods/index.vue'
	export default{
		components: {
			left,
			goods
		},
		data() {
			return {
				menu:[{
					name:'goods',
					title:'商品管理'
				},{
					name:'category',
					title:'类目管理'
				},{
					name:'commitment',
					title:'服务承诺'
				}]
			}
		},
	}
</script>

<style lang="less">
	div[tag="b2c_setting"]{
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
</style>
