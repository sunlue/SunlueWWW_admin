<template>
	<div>
		<Button type="info" size="small" @click="show = true">{{ $t('review') }}</Button>
		<Drawer v-model="show" width="600" :draggable="true" :title="$t('review') + $t('article_attach')">
			<Upload multiple type="drag" :action="$upload.file" :show-upload-list="false" :on-success="handleUploadSuccess">
				<div style="padding: 20px 0">
					<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					<p>{{ $t('upload_drag') }}</p>
				</div>
			</Upload>
			<template v-if="data.length > 0">
				<ul class="attach-upload-list">
					<template v-for="(file, index) in data">
						<li :key="index">
							<span>
								<Icon type="md-document" />
								{{ file.name }}
							</span>
							<template v-if="file.extension == 'pdf'">
								<a :href="$assets.url + file.link" target="_blank"><Icon type="ios-eye" class="ivu-upload-list-view" /></a>
							</template>
							<Icon type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove(file, index)" />
						</li>
					</template>
				</ul>
			</template>
		</Drawer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
		};
	},
	props: {
		data: {
			type: Array,
			default: () => {}
		}
	},
	methods: {
		handleUploadSuccess(res) {
			if (res.code == 200) {
				this.data.push(res.data);
			} else {
				this.$Notice.warning({
					title: this.$t('tips'),
					desc: res.info
				});
			}
		},
		handleRemove(file, index) {
			let that = this;
			that.$Modal.confirm({
				title: that.$t('tips'),
				content: that.$t('tips_delete_data'),
				onOk: function() {
					that.$store.dispatch('deleteArticleFileAssets', {
						path: file.link,
						uniqid: file.uniqid
					}).then(() => {
						that.data.splice(index, 1);
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
.attach-upload-list {
	margin-top: 8px;
	li {
		cursor: pointer;
		padding: 4px;
		color: #515a6e;
		border-radius: 4px;
		line-height: 24px;
		transition: background-color 0.2s ease-in-out;
		overflow: hidden;
		position: relative;
		.ivu-icon-md-document {
			width: 18px;
			height: 18px;
			text-align: center;
			font-size: 16px;
		}
		.ivu-upload-list-remove {
			margin-top: 4px;
		}
		&:hover {
			background: #f3f3f3;
			.ivu-upload-list-remove {
				opacity: 1;
			}
		}
	}
}
</style>
