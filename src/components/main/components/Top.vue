<template>
	<Header>
		<router-link class="logo" :to="{name:'main_index'}">
			<img src="../../../assets/index/logo.png" />
		</router-link>
		<ul class="tools">
			<li @click="shrink()">
				<Tooltip :content="$t('shrink')" placement="bottom-start">
					<i class="iconfont icon-shrink"></i>
				</Tooltip>
			</li>
		</ul>
		<div class="right">
			<Dropdown @on-click="selectLang">
				<a href="javascript:void(0)">
					{{ langTitle }}
					<Icon :size="18" type="md-arrow-dropdown" />
				</a>
				<DropdownMenu slot="list">
					<DropdownItem v-for="(lang, key) in language" :name="key" :key="key">{{ lang.local }}</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown @on-click="userAction">
				<a href="javascript:void(0)">
					{{$t('hello')}}！{{userInfo.name || userInfo.account}}
					<Icon :size="18" type="md-arrow-dropdown" />
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="edit_password">{{$t('edit_password')}}</DropdownItem>
					<DropdownItem name="logout" divided>{{$t('logout_login')}}</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Icon :size="24" color="white" type="md-more" @click="drawers()" />
		</div>
		<Drawer :title="$t('system_info')" v-model="drawer.serverInfo" :width="460">
			<CellGroup>
				<Cell :title="f" v-for="(v,f) in serverInfo" :key="f">
					<div v-html="v" slot="extra" v-if="v.length<100"></div>
				</Cell>
			</CellGroup>
		</Drawer>
		<Drawer :title="$t('edit_password')" v-model="drawer.editPwd" :width="460">
			<Form ref="editPwdForm" :model="edit_pwd.form.data" :rules="edit_pwd.form.rule">
				<FormItem :label="$t('user_account')">
					<Input :value="userInfo.account" :disabled ="true"></Input>
				</FormItem>
				<FormItem :label="$t('user_old_password')" prop="old_pwd">
					<Input type="password" v-model="edit_pwd.form.data.old_pwd " :placeholder="$t('please')+$t('enter')+$t('user_old_password')"></Input>
				</FormItem>
				<FormItem :label="$t('user_new_password')" prop="password">
					<Input type="password" v-model="edit_pwd.form.data.password" :placeholder="$t('please')+$t('enter')+$t('user_new_password')"></Input>
				</FormItem>
				<FormItem :label="$t('user_confirm_password')" prop="passwords">
					<Input type="password" v-model="edit_pwd.form.data.passwords" :placeholder="$t('please')+$t('enter')+$t('user_confirm_password')"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmitEditPwd">{{$t('btn_submit')}}</Button>
				</FormItem>
			</Form>
		</Drawer>
	</Header>
</template>

<script>
	export default {
		data() {
			let that = this,
				language = {
					'zh-CN': {
						lang: '语言',
						local: '中文简体'
					},
					// 'zh-TW': {
					// 	lang: '語言',
					// 	local: '中文繁体'
					// },
					// 'en-US': {
					// 	lang: 'Lang',
					// 	local: 'English'
					// }
				};
			return {
				lang: 'zh-CN',
				language: language,
				userInfo: that.$store.getters.userInfo,
				serverInfo: that.$store.getters.systemInfo.server,
				drawer:{
					serverInfo:false,
					editPwd:false
				},
				edit_pwd:{
					form:{
						data:{
							old_pwd:'',
							password:'',
							passwords:''
						},
						rule:{
							old_pwd: [
								{ required: true, message: this.$t('please')+this.$t('enter')+this.$t('user_old_password') }
							],
							password: [
								{ required: true, message: this.$t('please')+this.$t('enter')+this.$t('user_new_password') }
							],
							passwords: [
								{ required: true, message: this.$t('please')+this.$t('enter')+this.$t('user_confirm_password') },
							]
						}
					}
				}
			};
		},
		computed: {
			langTitle() {
				return this.language[this.lang]['lang'];
			}
		},
		methods: {
			shrink() {
				this.$emit('shrink');
			},
			openHref(name){
				let {href} = this.$router.resolve({
					name: name
				});
				window.open(href);
			},
			selectLang(lang) {
				this.lang = lang;
				this.$i18n.locale = lang;
				this.$store.commit('SET_LANGUAGE', lang);
			},
			userAction(name) {
				this[name]();
			},
			drawers() {
				this.drawer.serverInfo = !this.drawer.serverInfo;
			},
			edit_password() {
				this.drawer.editPwd = !this.drawer.editPwd;
			},
			handleSubmitEditPwd(){
				this.$refs['editPwdForm'].validate((valid) => {
					if (valid) {
						if(this.edit_pwd.form.data.password!=this.edit_pwd.form.data.passwords){
							this.$Message.error(this.$t('user_password_disaffinity'));
						}else{
							this.$store.dispatch('updateUserPwd',Object.assign({
								uniqid:this.userInfo.uniqid,
								account:this.userInfo.account
							},this.edit_pwd.form.data)).then(() => {
							})
						}
					}
				})
			},
			logout() {
				var that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_exit_system'),
					onOk: function() {
						that.$store.dispatch('exit').then(() => {
							that.$router.replace({
								name: 'login'
							});
						}).catch(err=>{
							that.$router.replace({
								name: 'login'
							});
						})
					}
				});
			}
		}
	};
</script>
