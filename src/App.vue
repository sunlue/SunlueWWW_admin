<template>
	<div id="app"><router-view /></div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {}
	},
};
</script>
<style lang="less">
	@import url('//at.alicdn.com/t/font_1065691_ox4wrqqg01.css');
	@import url('styles/app.css');
	@import url('styles/theme/default.less');
	#app {
		width: 100%;
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.split {
		border: 1px solid #dcdee2;
		height: 100%;
		.ivu-split-wrapper{
			.ivu-split-vertical{
				height: 100%;
			}
		}
		.split-pane {
			height: 100%;
			&.no-padding {
				padding: 0px;
			}
		}
	}
	
	.ivu-divider-horizontal{
		margin: 10px 0px !important;
	}
	
</style>
