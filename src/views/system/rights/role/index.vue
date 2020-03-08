<template>
	<div tag="system_rights_role" class="scroll">
		<Card :title="$t('root_node')+'['+$t('role')+']'" :padding="0">
			<Button slot="extra" type="info" size="small" @click="createRole('roleForm')">
				{{$t('btn_create')}}
			</Button>
			<CellGroup @on-click="select_role">
				<template v-for="(role,index) in data">
					<Cell :title="role.name" :name="index" :key="index" :selected="selected==index">
						<ButtonGroup slot="extra">
							<Button type="info" size="small" @click="updateRole(role,index)">{{$t('btn_update')}}</Button>
							<Button type="error" size="small" @click="handleRemove(role,index)">{{$t('btn_delete')}}</Button>
						</ButtonGroup>
					</Cell>
				</template>
			</CellGroup>
		</Card>
		<Tree :data="data" :render="renderRole" v-if="false"></Tree>
		<Modal v-model="modal" :mask-closable="false" :title="$t('role')" :footer-hide="false" :styles="{top: '50px'}">
			<Form ref="roleForm" :model="form.data" :rules="form.rule" :label-width="88">
				<FormItem :label="$t('role_name')" prop="name">
					<Input v-model="form.data.name" :placeholder="$t('enter_role_name')"></Input>
				</FormItem>
				<FormItem :label="$t('role_sign')">
					<Input v-model="form.data.sign" :placeholder="$t('enter_role_sign')"></Input>
				</FormItem>
				<FormItem :label="$t('role_remark')" style="margin-bottom: 0px;">
					<Input v-model="form.data.remark" type="textarea" :placeholder="$t('enter_role_remark')"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="closeModal('roleForm')">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" v-if="action=='create'" @click="handleCreate('roleForm')">{{ $t('btn_confirm') }}</Button>
				<Button type="primary" v-if="action=='update'" @click="handleUpdate('roleForm')">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	export default {
		data() {
			let that = this;
			return {
				editRoleData: [],
				modal: false,
				action: 'create',
				selected: '-1',
				form: {
					data: {
						name: '',
						sign: '',
						remark: ''
					},
					rule: {
						name: [{
							required: true,
							trigger: 'blur',
							message: that.$t('role_name_empty')
						}]
					}
				},
				data: []
			};
		},
		props: {
			rights: {
				type: Object,
				default: () => {}
			},
		},
		mounted() {
			this.$store.dispatch('readRole').then((data) => {
				this.data = data;
			});
		},
		methods: {
			select_role(name) {
				this.selected = name;
				this.$emit('rights', this.data[name], this.data[name]['rights'] || []);
				this.$emit('users', this.data[name], this.data[name]['users'] || []);
			},
			closeModal(name) {
				this.action = 'create';
				this.modal = false;
				this.$refs[name].resetFields();
			},
			createRole() {
				this.action = 'create';
				this.modal = true;
			},
			updateRole(data, index) {
				this.form.data = {
					name: data.name,
					sign: data.sign,
					remark: data.remark
				};
				this.editRoleData = data;
				this.modal = true;
				this.action = 'update';
			},
			handleCreate(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						this.$store.dispatch('createRole', {
							sign: this.form.data.sign,
							name: this.form.data.name,
							remark: this.form.data.remark
						}).then((result) => {
							this.data.push(result)
							this.closeModal();
						});
					}
				});
			},
			handleRemove(data, index) {
				let that = this;
				this.$Modal.confirm({
					title: this.$t('tips'),
					content: this.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteRole', {
							uniqid: data.uniqid
						}).then(() => {
							that.data.splice(index, 1);
						});
					}
				});

			},
			handleUpdate(name) {
				let data = this.editRoleData;
				this.$refs[name].validate(valid => {
					if (valid) {
						this.$store.dispatch('updateRole', {
							uniqid: data.uniqid,
							sign: this.form.data.sign,
							name: this.form.data.name,
							remark: this.form.data.remark
						}).then(() => {
							data.title = this.form.data.name;
							data.sign = this.form.data.sign;
							data.remark = this.form.data.remark;
							this.closeModal();
						});
					}
				});
			}
		}
	};
</script>

<style lang="less">
	div[tag="system_rights_role"] {
		padding: 8px;
	}
</style>
