<template>
	<div tag="link_index" class="page">
		<div class="scroll-y">
			<Row>
				<Col :xl="4" :md="6" :sm="12" :xs="24">
				<Card>
					<span slot="title">
						<Icon type="ios-link" />
						<a href="http://www.sunlue.com" target="_blank">上略互动</a>
					</span>
					<img src="http://admin.nzg.sunlue.com/static/index_login/img/logo.png" />
				</Card>
				</Col>
				<Col :xxl="2" :xl="4" :lg="6" :md="8" :sm="12" :xs="24" v-for="(item,index) in items" :key="index">
				<Card>
					<span slot="title">
						<Icon type="ios-link" />
						<a href="http://www.sunlue.com" target="_blank">{{item.name}}</a>
					</span>
					<ButtonGroup slot="extra">
						<Button size="small" type="info" @click="handleUpdate(item,index)">{{$t('btn_update')}}</Button>
						<Button size="small" type="error" @click="handleDelete(item,index)">{{$t('btn_delete')}}</Button>
					</ButtonGroup>
					<img :src="imgUrl+item.icon" />
				</Card>
				</Col>
				<Col span="4">
				<Card class="add-action">
					<div @click="handleCreate">
						<Icon type="ios-add" size="80" />
					</div>
				</Card>
				</Col>
			</Row>
		</div>
		<Modal v-model="model" width="800" :mask-closable="false" :footer-hide="false" :title="$t('site_link')"
		 @on-visible-change="closeModal" :styles="{top: '50px'}">
			<link-page ref="linkpage" @createComplete="createComplete" @updateComplete="updateComplete"></link-page>
			<div slot="footer">
				<Button @click="model=false">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" v-if="action=='create'" @click="handleCreateSubmit('linkForm')">{{ $t('btn_confirm') }}</Button>
				<Button type="primary" v-if="action=='update'" @click="handleUpdateSubmit('linkForm')">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import linkPage from './link.vue'
	export default {
		components: {
			linkPage
		},
		data() {
			let uploadUrl = this.$assets.url;
			return {
				model: false,
				items: [],
				imgUrl: uploadUrl,
				action: 'create',
				update: {
					data: {},
					index: ''
				}
			}
		},
		mounted() {
			this.handleRead();
		},
		methods: {
			handleRead() {
				this.$store.dispatch('readLink').then((result) => {
					this.items = result;
				})
			},
			handleCreate() {
				this.action = 'create';
				this.model = true;
			},
			handleCreateSubmit(name) {
				this.$refs.linkpage.handleCreateSubmit(name);
			},
			createComplete(data) {
				this.items.push(data);
				this.model = false;
			},
			handleDelete(item, index) {
				let that = this;
				this.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteLink', {
							uniqid: item.uniqid
						}).then((result) => {
							that.items.splice(index, 1);
						})
					}
				});
			},
			handleUpdate(item, index) {
				this.model = true;
				this.action = 'update';
				this.$refs.linkpage.handleUpdate(item);
				this.update.data = item;
				this.update.index = index;
			},
			handleUpdateSubmit(name) {
				this.$refs.linkpage.handleUpdateSubmit(name);
			},
			updateComplete(data) {
				this.model = false;
				this.items[this.update.index]=data;
			},
			closeModal(status) {
				if (status) {
					this.$refs.linkpage.resetForm('linkForm');
					this.update.data = {};
					this.update.index = '';
				}
			}
		}
	}
</script>

<style lang="less">
	div[tag="link_index"]{
		&.page{
			padding: 0px;
		}
		.scroll-y{
			position: absolute;
			width: 100%;
			padding: 10px 5px;
		}
		.ivu-col {
			padding-bottom: 10px;
			.ivu-card{
				margin: 0px 5px;
			}
				
			.ivu-card-extra {
				top: 8px;
				right: 8px;
			}

			.add-action {
				.ivu-card-body {
					height: 176px;
					text-align: center;
					padding: 0px;

					div {
						position: relative;
						width: 100%;
						height: 100%;
						cursor: pointer;

						.ivu-icon {
							top: 50%;
							left: 50%;
							position: absolute;
							transform: translate(-50%, -50%);
						}
					}
				}
			}

			.ivu-card-body {
				height: 132px;
				position: relative;

				img {
					max-width: calc(100% - 32px);
					max-height: calc(100% - 32px);
					position: absolute;
					top: 50%;
					left: 50%;
					display: block;
					transform: translate(-50%, -50%);
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
