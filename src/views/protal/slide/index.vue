<template>
	<div tag="protal_slide" class="page">
		<div class="split">
			<Split v-model="split.left">
				<div slot="left" class="split-pane left scroll-y">
					<nav-tree @create="navTreeClick" @select="navTreeSelect"></nav-tree>
				</div>
				<div slot="right" class="split-pane right">
					<slide ref="slide"></slide>
				</div>
			</Split>
		</div>
		<Modal v-model="model" width="800" :mask-closable="false" :title="$t('create')+$t('slide')" :footer-hide="false" :closable="false"
		 tag="protal_slide">
			<create ref="create" :navData="navData"></create>
			<div slot="footer">
				<Button @click="closeModal('slideForm')">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" @click="createSlide">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import navTree from './components/navTree'
	import create from './components/create'
	import slide from './components/slide'
	export default {
		components: {
			slide,
			create,
			navTree
		},
		data() {
			return {
				split: {
					left: 0.25
				},
				navData: {},
				model: false,
				searchData: {}
			};
		},
		mounted() {},
		methods: {
			navTreeClick(root, node, data) {
				this.navData = data;
				this.model = true;
			},
			navTreeSelect(root, node, data) {
				this.$refs.slide.searchSlide(data);
			},
			closeModal(name) {
				this.$refs.create.resetFields();
				this.$refs.create.form.upload.result.path=''
				this.$refs.create.form.upload.result.name=''
				this.model = false;
			},
			createSlide() {
				let that = this,
					createPage = this.$refs['create'],
					data = createPage.form.data;
				createPage.formValidate('slideForm', function() {
					that.$store.dispatch('createSlide', {
						nav: that.navData.uniqid,
						name: data.name,
						sign: data.sign,
						link: data.link,
						image: data.image,
						remark: data.remark
					}).then((result) => {
						that.$refs.slide.appendSlide(result);
						that.closeModal();
					});
				});
			},
		}
	};
</script>

<style lang="less">
	div[tag="protal_slide"] {
		.split-pane.left {
			padding: 0px 10px;
		}

		.ivu-split-horizontal {
			.ivu-split-trigger-con {
				&+.right-pane {
					left: calc(25% + 6px) !important;
				}
			}
		}

		.upload-preview {
			line-height: 0px;
			text-align: center;
			border-radius: 4px;
			height: 166px;

			img {
				width: 252px;
				height: 100%;
				margin: 0 auto;
			}
		}
	}
</style>
