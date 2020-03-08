<template>
	<Layout class="b2c_main">
		<Top></Top>
		<Content><router-view /></Content>
		<Footer>
			footer
		</Footer>
	</Layout>
</template>

<script>
	import './index.less';
	import Top from './components/Top.vue'
	export default{
		components: {
			Top
		},
		data() {
			return {
			}
		},
	}
</script>

<style>
</style>
