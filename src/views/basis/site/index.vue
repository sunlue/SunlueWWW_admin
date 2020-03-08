<template>
	<div tag="site_index" class="page">
		<div class="site-slide">
			<Menu theme="light" :active-name='tab' @on-select="select">
				<MenuItem name="setting">{{$t('site_setting')}}</MenuItem>
				<MenuItem name="upload">{{$t('upload_setting')}}</MenuItem>
			</Menu>
		</div>
		<div class="site-panel">
			<div class="panel-tab scroll" v-if="tab=='setting'">
				<setting></setting>
			</div>
			<div class="panel-tab scroll" v-if="tab=='upload'">
				<upload></upload>
			</div>
		</div>
	</div>
</template>

<script>
	import setting from './panel/setting.vue'
	import upload from './panel/upload.vue'
	export default {
		components: {
			setting,
			upload
		},
		data() {
			return {
				tab:'setting'
			}
		},
		methods: {
			select(name) {
				this.tab=name;
			}
		},
	}
</script>

<style lang="less">
	.page[tag="site_index"] {
		background: #f0f0f0;
		padding: 0px;

		.site-slide {
			height: 100%;
			background: white;
			position: absolute;
		}
		.site-panel{
			padding-left: 240px;
			height: 100%;position: absolute;
			width: 100%;
			.panel-tab{
				padding:10px;
			}
		}
	}
</style>
