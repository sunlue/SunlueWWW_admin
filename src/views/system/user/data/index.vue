<template>
	<div class="datagrid">
		<ButtonGroup :size="buttonSize">
			<Button :size="buttonSize" type="primary" @click="$emit('create')">{{$t('btn_create')}}</Button>
			<Button :size="buttonSize" type="primary" @click="renderUser({page:1})">{{$t('btn_refresh')}}</Button>
		</ButtonGroup>
		<Divider size="small" />
		<div class="datatable">
			<div class="scroll-y">
				<Table ref="datatable" size="small" :columns="datagrid.table.columns" :data="datagrid.table.data" :loading="datagrid.table.loading"
				 :border="true" :draggable="true">
					<template slot-scope="{ row,index }" slot="is_login">
						<i-switch size="large" :value="row.is_login+''" true-value="yes" false-value="no" @on-change="handleSwitch(row,index,'is_login',$event)">
							<span slot="open">yes</span>
							<span slot="close">no</span>
						</i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="is_mobile">
						<i-switch size="large" :value="row.is_mobile+''" true-value="yes" false-value="no" @on-change="handleSwitch(row,index,'is_mobile',$event)">
							<span slot="open">yes</span>
							<span slot="close">no</span>
						</i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="resetPwd">
						<Button size="small" type="primary" @click="handleResetPwd(row,index)">
							{{$t('user_reset_password')}}
						</Button>
					</template>
					<template slot-scope="{ row,index }" slot="action">
						<ButtonGroup>
							<Button size="small" type="primary" @click="$emit('update',row,index)">
								{{$t('btn_update')}}
							</Button>
							<Button size="small" type="error" @click="deleteUser(row,index)">
								{{$t('btn_delete')}}
							</Button>
						</ButtonGroup>
					</template>
				</Table>
			</div>
			<Row style="margin: 10px 0px;">
				<Col span="12">
				<Page :total="datagrid.paging.total" :current="datagrid.paging.current" :page-size="datagrid.paging.pageSize"
				 :show-sizer="true" size="small" @on-change="changePage" @on-page-size-change="changePageSize"></Page>
				</Col>
				<Col span="12" class="text-right">
				共计{{datagrid.paging.total}}条数据，
				共计{{Math.ceil(datagrid.paging.total/datagrid.paging.pageSize)}}页，
				当前第{{datagrid.paging.current}}页
				</Col>
			</Row>
		</div>
		<Modal v-model="reset_pwd.show" :title="$t('user_reset_password')" :closable="false" :footer-hide="false">
			<Form ref="resetForm" :model="reset_pwd.form.value" :rules="reset_pwd.form.rule" :label-width="80">
				<FormItem :label="$t('user_new_password')" prop="password">
					<Input v-model="reset_pwd.form.value.password" type="password" :placeholder="$t('please')+$t('enter')+$t('user_new_password')"></Input>
				</FormItem>
				<FormItem :label="$t('user_confirm_password')" prop="passwords">
					<Input v-model="reset_pwd.form.value.passwords" type="password" :placeholder="$t('please')+$t('enter')+$t('user_confirm_password')"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click=" reset_pwd.show=false ">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" @click="handleReset('resetForm')">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				buttonSize: 'small',
				datagrid: {
					table: {
						columns: [{
								width: 50,
								align:'center',
								type: 'index'
							},
							{
								title: that.$t('user_name'),
								key: 'name',
								minWidth: 90,
								align: 'center'
							},
							{
								title: that.$t('user_account'),
								minWidth: 120,
								align: 'center',
								key: 'account'
							},
							{
								title: that.$t('user_mobile'),
								minWidth: 120,
								align: 'center',
								key: 'mobile'
							},
							{
								title: that.$t('user_nickname'),
								minWidth: 120,
								align: 'center',
								key: 'nickname'
							},
							{
								title: that.$t('user_weixin'),
								minWidth: 150,
								align: 'center',
								key: 'weixin'
							},
							{
								title: that.$t('user_qq'),
								minWidth: 120,
								align: 'center',
								key: 'qq'
							},
							{
								title: that.$t('user_email'),
								minWidth: 150,
								align: 'center',
								key: 'email'
							},
							{
								title: that.$t('user_account_login'),
								minWidth: 90,
								align: 'center',
								slot: 'is_login'
							},
							{
								title: that.$t('user_mobile_login'),
								minWidth: 90,
								align: 'center',
								slot: 'is_mobile'
							}, {
								title: that.$t('user_login_count'),
								minWidth: 90,
								align: 'center',
								key: 'login_count'
							},
							{
								title: '',
								minWidth: 100,
								align: 'center',
								slot: 'resetPwd'
							},
							{
								title: '',
								width: 150,
								align: 'center',
								fixed: 'right',
								slot: 'action'
							},
						],
						data: [],
						loading: false
					},
					paging: {
						total: 0,
						current: 1,
						pageSize: 10
					}
				},
				reset_pwd: {
					show: false,
					todo: {},
					todoIndex: '',
					form: {
						value: {
							password: '',
							passwords: ''
						},
						rule: {
							password: [{
								required: true,
								message: that.$t('please') + that.$t('enter') + that.$t('user_new_password'),
								trigger: 'blur'
							}],
							passwords: [{
								required: true,
								message: that.$t('please') + that.$t('enter') + that.$t('user_confirm_password'),
								trigger: 'blur'
							}]
						}
					}
				}
			}
		},
		mounted() {
			let that = this;
			this.renderUser({
				page: 1
			}, function(result) {
				that.datagrid.paging.total = result.total;
				that.datagrid.paging.current = result.current_page;
			})
		},
		methods: {
			changePage(pageNumber) {
				this.renderUser({
					page: pageNumber
				})
			},
			changePageSize(PageSize) {
				this.datagrid.paging.pageSize = PageSize;
				this.renderUser({
					page: 1,
					limit: this.datagrid.paging.pageSize,
				})
			},
			renderUser(where, callback) {
				this.datagrid.table.loading = true;
				this.$store.dispatch('readUser', where).then((result) => {
					this.datagrid.table.data = result.data;
					this.datagrid.table.loading = false;
					typeof(callback) == 'function' ? callback(result): '';
				});
			},
			handleSwitch(row, index, field, value) {
				this.$store.dispatch('updateUser', {
					userid: row.userid,
					uniqid: row.uniqid,
					field: field,
					value: value
				}).then(() => {
					this.$Message.success('success');
				})
			},
			createUser(data) {
				this.datagrid.table.data.push(data);
			},
			deleteUser(row, index) {
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteUser', {
							uniqid: row.uniqid,
						}).then((result) => {
							that.datagrid.table.data.splice(index, 1);
						});
					}
				});
			},
			handleResetPwd(row, index) {
				this.reset_pwd.todo = row;
				this.reset_pwd.todoIndex = index;
				this.reset_pwd.show = true;
			},
			handleReset(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if (this.reset_pwd.form.value.password != this.reset_pwd.form.value.passwords) {
							this.$Message.error(this.$t('user_password_disaffinity'));
							return false;
						}
						this.$store.dispatch('resetUserPwd', {
							userid: this.reset_pwd.todo.userid,
							account: this.reset_pwd.todo.account,
							password: this.reset_pwd.form.value.password,
							passwords: this.reset_pwd.form.value.passwords
						}).then((result) => {
							this.$Message.success('success');
							this.reset_pwd.show = false;
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.datagrid {
		height: 100%;

		.datatable {
			height: 100%;

			.scroll-y {
				height: calc(100% - 81px);
			}
		}
	}
</style>
