<template>
	<div tag="system_rights_user">
		<Row>
			<Col span="21">
			<Select v-model="selected_index" filterable multiple @on-change="changeSec">
				<Option v-for="(item,index) in users" :value="index" :key="item.userid">{{ item.name }}</Option>
			</Select>
			</Col>
			<Col span="3" class="text-right">
			<Button type="primary" @click="handleSubmit">{{$t('btn_save')}}</Button>
			</Col>
		</Row>
		<Divider />
		<Table :columns="columns" :data="data" :border="true" size="small"></Table>
	</div>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				users: [],
				selected_uniqid: [],
				selected_index: [],
				selected_user: [],
				selected_role: {},
				columns: [{
					type: 'index',
					width: 50
				}, {
					title: that.$t('user_account'),
					minWidth: 92,
					align: 'center',
					key: 'account'
				}, {
					title: that.$t('user_name'),
					minWidth: 92,
					align: 'center',
					key: 'name'
				}, {
					title: that.$t('user_nickname'),
					minWidth: 120,
					align: 'center',
					key: 'nickname'
				}, {
					title: that.$t('user_mobile'),
					minWidth: 120,
					align: 'center',
					key: 'mobile'
				}, {
					title: that.$t('user_email'),
					minWidth: 150,
					align: 'center',
					key: 'email'
				}, {
					title: that.$t('user_weixin'),
					minWidth: 92,
					align: 'center',
					key: 'weixin'
				}, {
					title: that.$t('user_qq'),
					minWidth: 92,
					align: 'center',
					key: 'qq'
				}, {
					title: that.$t('user_account_login'),
					minWidth: 92,
					align: 'center',
					key: 'is_login'
				}, {
					title: that.$t('user_mobile_login'),
					minWidth: 92,
					align: 'center',
					key: 'is_mobile'
				}, {
					title: that.$t('user_login_count'),
					minWidth: 92,
					align: 'center',
					key: 'login_count'
				}, {
					width: 76,
					align: 'center',
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.handleDelete(params)
									}
								}
							}, that.$t('btn_delete'))
						]);
					}
				}],
				data: []
			}
		},
		mounted() {
			this.$store.dispatch('readUser').then((users) => {
				sessionStorage.setItem('system_role_users', JSON.stringify(users))
				this.users = users;
			})
		},
		methods: {
			setUsers(data, users) {
				let that = this;
				this.data = users;
				this.selected_role = data;
				let haveAuthUser = [];
				users.map((i) => {
					haveAuthUser.push(i.uniqid);
				})
				let system_role_users = sessionStorage.getItem('system_role_users');
				system_role_users = JSON.parse(system_role_users);
				this.users = [];
				system_role_users.filter(function(user) {
					if (!haveAuthUser.includes(user.uniqid)) {
						that.users.push(user);
					}
				})
			},
			changeSec(value, label) {
				this.selected_user = [];
				this.selected_uniqid = [];
				value.find((item) => {
					this.selected_user.push(this.users[item])
					this.selected_uniqid.push(this.users[item]['uniqid'])
				})
			},
			handleSubmit() {
				this.$store.dispatch('roleUserAuth', {
					role: this.selected_role.uniqid,
					users: this.selected_uniqid
				}).then((result) => {
					this.selected_user.find((item,index) => {
						result.find((auth)=>{
							if(auth.userid==item.uniqid){
								item['authid']=auth['uniqid'];
								this.data.push(item);
							}
						})
					})
					this.selected_user = [];
					this.selected_index = [];
					this.selected_uniqid = [];
					this.$Message.success('success');
				})
			},
			handleDelete(params) {
				let data = params.row;
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteUserAuth', {
							authid: data.authid,
						}).then((result) => {
							that.data.splice(params.index, 1);
						});
					}
				});
			},
			resetUser(){
				let that = this;
				let haveAuthUser = [];
				users.map((i) => {
					haveAuthUser.push(i.uniqid);
				})
				let system_role_users = sessionStorage.getItem('system_role_users');
				system_role_users = JSON.parse(system_role_users);
				this.users = [];
				system_role_users.filter(function(user) {
					if (!haveAuthUser.includes(user.uniqid)) {
						that.users.push(user);
					}
				})
			}
		},
	}
</script>

<style lang="less">
	div[tag="system_rights_user"] {
		padding: 8px;
	}
</style>
