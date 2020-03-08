<template>
	<div tag="plugin" class="page">
		<Row>
			<Col :xxl="4" :lg="6" :md="12" :sm="24" v-for="(item,index) in plugin.data" :key="index">
			<Card>
				<p slot="title">{{item.name}}</p>
				<template v-if="item.install!='1'">
					<Button type="info" long @click="action(item,index,'install')">
						{{$t('install')}}
					</Button>
				</template>
				<template v-else>
					<ButtonGroup>
						<Button type="info" v-if="item.content" @click="review(item)">{{$t('review')}}</Button>
						<Button type="success" v-if="item.enable=='1'" @click="config(item)">{{$t('config')}}</Button>
						<Button type="primary" v-if="item.enable!='1'" @click="action(item,index,'enable')">{{$t('enable')}}</Button>
						<Button type="warning" v-if="item.enable=='1'" @click="action(item,index,'disable')">{{$t('disable')}}</Button>
						<Button type="error" v-if="item.install=='1'" @click="action(item,index,'uninstall')">{{$t('uninstall')}}</Button>
					</ButtonGroup>
				</template>
			</Card>
			</Col>
		</Row>
		<Modal v-model="modal.show" :title="modal.title" width="1000" :footer-hide="true" class-name="vertical-center-modal">
			<router-view :name="plugin.view" />
		</Modal>
		<Modal v-model="install.show" :title="install.title">
			<Form ref="installForm" label-position="top" :model="installForm.data" :rules="installForm.rule">
				<FormItem :label="$t('plugin_name')+'(name)'">
					<Input v-model='installForm.data.name' disabled="disabled" />
				</FormItem>
				<FormItem :label="$t('plugin_appid')+'(appid)'" prop="appid">
					<Input v-model='installForm.data.appid'></Input>
				</FormItem>
				<FormItem :label="$t('plugin_appkey')+'(appkey)'" prop="appkey">
					<Input v-model='installForm.data.appkey'></Input>
				</FormItem>
			</Form>
			<p slot="footer">
				<Button type="info" @click="handleInstall">
					{{$t('btn_confirm')+$t('install')}}
				</Button>
			</p>
		</Modal>
		<Drawer :title="drawer.title" :closable="false" v-model="drawer.show">
			<div v-html="drawer.content"></div>
		</Drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				plugin: {
					data: [],
					view: 'capacity'
				},
				modal: {
					show: false,
					title: ''
				},
				install: {
					show: false,
					title: '安装应用'
				},
				installForm: {
					index: '',
					data: {
						uniqid: '',
						name: '',
						appid: '',
						appkey: ''
					},
					rule: {
						appid: [{
							required: true,
							message: '请输入应用授权ID(appid)',
							trigger: 'blur'
						}],
						appkey: [{
							required: true,
							message: '请输入应用授权密钥(appkey)',
							trigger: 'blur'
						}]
					},
				},
				drawer: {
					show: false,
					title: '',
					content: ''
				}
			}
		},
		mounted() {
			this.$store.dispatch('readPlugin').then((data) => {
				this.plugin.data = data;
			})
		},
		methods: {
			action(item, index, name) {
				switch (name) {
					case 'install':
						this.install.title = '安装应用' + item.name;
						this.installForm.data.name = item.name;
						this.installForm.data.uniqid = item.uniqid;
						this.installForm.index = index;
						this.install.show = true;
						break;
					case 'uninstall':
						this.handleUnInstall(item, index);
						break;
					case 'enable':
					case 'disable':
						this.handleState(item, index, name);
						break;
					default:
						break;
				}
			},
			handleInstall() {
				this.$refs['installForm'].validate((valid) => {
					if (valid) {
						this.$store.dispatch('installPlugin', this.installForm.data).then(() => {
							this.plugin.data[this.installForm.index]['install'] = 1;
							this.install.show = false;
						})
					}
				})
			},
			handleUnInstall(item, index) {
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_uninstall_data'),
					onOk: function() {
						that.$store.dispatch('uninstallPlugin', {
							uniqid: item.uniqid,
						}).then(() => {
							that.plugin.data[index]['install'] = 2;
						});
					}
				});
			},
			handleState(item, index, name) {
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_' + name + '_data'),
					onOk: function() {
						that.$store.dispatch('statePlugin', {
							uniqid: item.uniqid,
						}).then((result) => {
							that.plugin.data[index]['enable'] = result.enable;
						});
					}
				});
			},
			review(item) {
				this.drawer.show = true;
				this.drawer.content = item.content;
				this.drawer.title = item.name;
			},
			config(item) {
				switch (item.type) {
					case 'config':
						this.plugin.view = item.pages;
						this.modal.show = true;
						this.modal.title = '配置' + item.name;
						// this.$router.push({
						// 	name: 'plugin_config'
						// })
						break;
					default:
						let {
							href
						} = this.$router.resolve({
							name: item.name
						});
						window.open(href);
						break;
				}
			}
		},
	}
</script>

<style lang="less">
	div[tag="plugin"] {
		padding: 10px 5px;

		.ivu-card {
			margin: 5px;
			box-sizing: border-box;

			.ivu-card-body {
				text-align: center;
			}
		}
	}
</style>
