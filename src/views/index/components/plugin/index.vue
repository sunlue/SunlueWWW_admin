<template>
	<div class="main-plugin">
		<Row :gutter="10">
			<Col :lg="8" :md="12" :sm="24" v-for="(item,index) in plugin.data" :key="index">
				<Card class="item">
					<p slot="title">{{item.name}}</p>
					<template v-if="item.install!='1'">
						<Button type="info" long @click="action(item,index,'install')">
							{{$t('install')}}
						</Button>
					</template>
					<template v-else>
						<ButtonGroup>
							<Button type="info" v-if="item.content" @click="pluginView(item)">{{$t('review')}}</Button>
							<Button type="success" v-if="item.enable=='1'" @click="pluginConfig(item)">{{$t('config')}}</Button>
							<Button type="primary" v-if="item.enable!='1'" @click="pluginAction(item,index,'enable')">{{$t('enable')}}</Button>
							<Button type="warning" v-if="item.enable=='1'" @click="pluginAction(item,index,'disable')">{{$t('disable')}}</Button>
							<Button type="error" v-if="item.install=='1'" @click="pluginAction(item,index,'uninstall')">{{$t('uninstall')}}</Button>
						</ButtonGroup>
					</template>
				</Card>
			</Col>
		</Row>
		<Modal v-model="modal.show" :title="modal.title" width="1000" :footer-hide="true" class-name="vertical-center-modal">
			<router-view :name="plugin.view" />
		</Modal>
	</div>
</template>

<script>
	export default {
		name: 'index',
		components: {},
		data() {
			return {
				modal: {
					show: false,
					title: ''
				},
				plugin: {
					data: [],
					view: 'capacity'
				},
			}
		},
		mounted() {
			this.$store.dispatch('readPlugin').then((data) => {
				this.plugin.data = data;
			})
		},
		methods: {
			pluginAction(item, index, name) {
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
			pluginReview(item) {
				this.drawer.show = true;
				this.drawer.content = item.content;
				this.drawer.title = item.name;
			},
			pluginConfig(item) {
				switch (item.type) {
					case 'config':
						this.plugin.view = item.pages;
						this.modal.show = true;
						this.modal.title = '配置' + item.name;
						break;
					default:
						let {href} = this.$router.resolve({
							name: item.name
						});
						window.open(href);
						break;
				}
			}
		}
	};
</script>

<style lang="less">
</style>
