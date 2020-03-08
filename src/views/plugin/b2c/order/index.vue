<template>
	<Layout class="ivu-layout-has-sider">
		<left></left>
		<Content tag="b2c_setting">
			
			order
		</Content>
	</Layout>
</template>

<script>
	import left from '@/components/b2c/sider.vue'
	export default{
		components: {
			left
		}
	}
</script>

<style lang="less">
	div[tag="b2c_setting"]{
		height: 100%;
	}
</style>
