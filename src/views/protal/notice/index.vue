<template>
	<div tag="notice">
		<div class="datagrid" v-if="action=='datagrid'">
			<Row style="padding: 10px;">
				<Col span="2">
				<Button long type="primary" @click="handleCreate">{{$t('create')}}</Button>
				</Col>
				<Col span="22">
				<Input :search="true" :enter-button="$t('btn_search')" @on-search="handleSearch"></Input>
				</Col>
			</Row>
			<Divider />
			<div class="scroll-y">
				<Row :gutter="10">
					<Col :xl="4" :md="6" :sm="12" :xs="24" v-for="(item,index) in data" :key="index">
					<div class="item">
						<div :class="['thumb']">
							<img v-if="false" src="http://www.sunlue.com/templates/main/images/banner1.jpg" />
							<p class="title">
								<span>
									{{item.title}}
								</span>
							</p>
						</div>
						<div class="intro">
							<span>{{item.content.replace(/<[^>]+>/g,"")}}</span>
						</div>
						<div class="footer">
							<div class="pull">
								<span v-if="item.release==1">{{item.by_time}}</span>
							</div>
							<div class="pull">
								<Tooltip :content="$t('btn_release')" v-if="item.release!=1">
									<Icon type="ios-create-outline" size="20" @click="handleRelease(item,index)" />
								</Tooltip>
								<Tooltip :content="$t('btn_cancel')+$t('btn_release')" v-if="item.release==1">
									<Icon type="ios-create" size="20" @click="handleRelease(item,index)" />
								</Tooltip>
								<Tooltip :content="$t('btn_update')">
									<Icon type="ios-build" size="20" @click="handleUpdate(item,index)" />
								</Tooltip>
								<Tooltip :content="$t('btn_delete')">
									<Icon type="ios-trash" size="20" @click="handleDelete(item,index)" />
								</Tooltip>
								<Tooltip :content="$t('review')">
									<Icon type="ios-eye" size="20" @click="review(item)" />
								</Tooltip>
							</div>
						</div>
					</div>
					</Col>
					<Col span="24" v-if="data.length<1" class="empty">
					暂无数据
					</Col>
				</Row>

			</div>
			<Divider />
			<div class="text-center">
				<Page :total="paging.total" :page-size="paging.pageSize" @on-change="handleTurnPage" show-elevator />
			</div>
		</div>

		<template v-else>
			<div class="scroll-y">
				<Form ref="formVal" :model="form.value" :rules="form.rules" :label-width="80">
					<FormItem :label="$t('notice_title')" prop="title">
						<Input v-model="form.value.title"></Input>
					</FormItem>
					<FormItem :label="$t('notice_content')" prop="content">
						<Tinymce ref="tinymce" v-model="form.value.content" />
					</FormItem>
					<FormItem :label="$t('notice_release')">
						<i-switch v-model="form.value.release" :true-value="1" :false-value="2">
							<span slot="open">是</span>
							<span slot="close">否</span>
						</i-switch>
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
						<Button @click="action='datagrid'" style="margin-left: 8px;">{{$t('back')}}</Button>
					</FormItem>
				</Form>
			</div>
		</template>

		<Drawer :closable="false" v-model="drawer.show" width="1000">
			<h2>{{drawer.title}}</h2>
			<Divider />
			<div v-html="drawer.content"></div>
		</Drawer>
	</div>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
	export default {
		components: {
			Tinymce
		},
		data() {
			let that = this;
			return {
				action: 'datagrid',
				data: {},
				update: '',
				updateIndex: '',
				form: {
					value: {
						title: '',
						thumb: '',
						content: '',
						release: 1
					},
					rules: {
						title: [{
							required: true,
							trigger: 'blur',
							message: that.$t('please') + that.$t('enter') + that.$t('notice_title')
						}, ],
						content: [{
							required: true,
							trigger: 'blur',
							message: that.$t('please') + that.$t('enter') + that.$t('notice_content')
						}, ],
					}
				},
				drawer: {
					show: false,
					title: '',
					content: ''
				},
				paging: {
					total: 0,
					pageSize: 10
				}
			}
		},
		mounted() {
			let that = this;
			this.handleRead({
				page: 1,
				limit: this.paging.pageSize
			})
		},
		methods: {
			handleRead(where, callback) {
				this.$store.dispatch('readNotice', where).then((result) => {
					this.data = result.data;
					this.paging.total = result.total;
				})
			},
			handleSubmit() {
				this.$refs['formVal'].validate((valid) => {
					if (!valid) {
						return false;
					}
					var data = this.form.value;
					if (this.action == 'create') {
						this.$store.dispatch('createNotice', this.form.value).then((result) => {
							this.data.push(result)
							this.action = 'datagrid';
						})
					} else if (this.action == 'update') {
						let data = Object.assign(this.form.value, {
							uniqid: this.update
						})
						this.$store.dispatch('updateNotice', data).then((result) => {
							this.action = 'datagrid';
							this.data[this.updateIndex]['title'] = result.title;
							this.data[this.updateIndex]['content'] = result.content;
							this.data[this.updateIndex]['release'] = result.release;
						})
					}
				});
			},
			handleSearch(value) {
				let that = this;
				this.handleRead({
					page: 1,
					title: value,
					limit: this.paging.pageSize
				})
			},
			handleTurnPage(page) {
				let that = this;
				this.handleRead({
					page: page,
					limit: this.paging.pageSize
				})
			},
			handleRelease(item, index) {
				this.$store.dispatch('releaseNotice', {
					uniqid: item.uniqid,
					release: item.release == 1 ? 2 : 1
				}).then((result) => {
					this.data[index]['release'] = item.release == 1 ? 2 : 1;
				})
			},
			handleCreate() {
				this.action = 'create';
			},
			handleUpdate(item, index) {
				this.action = 'update';
				this.form.value.title = item.title;
				this.form.value.content = item.content;
				this.form.value.release = item.release;
				this.update = item.uniqid;
				this.updateIndex = index;
				this.$refs.tinymce.setContent(item.content);
			},
			handleDelete(item, index) {
				let that = this;
				this.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteNotice', {
							uniqid: item.uniqid
						}).then(() => {
							that.data.splice(index, 1);
						});
					}
				});
			},
			review(item) {
				this.drawer.show = true;
				this.drawer.title = item.title;
				this.drawer.content = item.content;
			}
		},
	}
</script>

<style lang="less">
	div[tag="notice"] {
		height: 100%;
		position: relative;
		background: white;
		
		&>.scroll-y{
			position: absolute;
			width: 100%;
		}

		.datagrid {
			position: absolute;
			width: 100%;
			height: 100%;
			.scroll-y {
				width: 100%;
				max-height: calc(100% - 136px);
				padding: 0px 10px;
			}
		}
		
		.empty {
			height: 300px;
			line-height: 300px;
			border: 1px solid #cccccc;
			text-align: center;
		}

		.item {
			box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
			margin: 5px 0px;

			.thumb {
				&.is-img {
					position: relative;
					width: 100%;
					height: 165px;
					overflow: hidden;
				}

				img {
					width: 100%;
				}

				.title {
					position: static;
					width: 100%;
					padding: 24px;
					box-sizing: border-box;
					border-bottom: 1px solid #cccccc;
					overflow: hidden;

					span {
						height: 44px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						width: 100%;
						overflow: hidden;
						font-size: 16px;
						color: #108EE9;
					}
				}

				img+.title {
					position: absolute;
					bottom: 0px;
					left: 0px;
					width: 100%;
					background: rgba(0, 0, 0, .5);
					padding: 10px;
					box-sizing: border-box;

					span {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						font-size: 16px;
						color: white;
					}
				}

				&+.intro {
					padding: 10px;

					span {
						-webkit-line-clamp: 6;
						line-height: 23px;
						height: 136px;
						-webkit-box-orient: vertical;
						display: -webkit-box;
						overflow: hidden;
					}
				}

				&.is-img+.intro {
					span {
						-webkit-line-clamp: 3;
						height: 66px;
						line-height: 22px;
					}
				}
			}

			.footer {
				padding: 10px;
				display: flex;
				justify-content: space-between;

				.ivu-icon {
					cursor: pointer;
					margin-left: 5px;
				}
			}
		}

		form {
			padding: 10px;
		}
	}
</style>
