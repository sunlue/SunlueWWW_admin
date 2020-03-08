<template>
	<div tag="user_create" class="scroll-full">
		<Card>
			<p slot="title">
				<Icon type="ios-add-circle-outline" :size="18" />
				{{$t('create')}}{{$t('user')}}
			</p>
			<a href="#" slot="extra" @click="$emit('back')">
				<Icon type="ios-arrow-back" />
				{{$t('back')}}{{$t('user_list')}}
			</a>
			<div class="scroll-y">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					<Tabs v-model="tabs">
						<TabPane :label="$t('user_info')" name="info">
							<Row>
								<Col span="12">
								<FormItem :label="$t('user_nickname')" prop="password">
									<Input v-model="formValidate.nickname" :placeholder="$t('please')+$t('enter')+$t('user_nickname')"></Input>
								</FormItem>
								<FormItem :label="$t('user_name')" prop="name">
									<Input v-model="formValidate.name" :placeholder="$t('please')+$t('enter')+$t('user_name')"></Input>
								</FormItem>
								<FormItem :label="$t('user_mobile')" prop="mobile">
									<Input v-model="formValidate.mobile" :placeholder="$t('please')+$t('enter')+$t('user_mobile')"></Input>
								</FormItem>
								<FormItem :label="$t('user_weixin')" prop="weixin">
									<Input v-model="formValidate.weixin" :placeholder="$t('please')+$t('enter')+$t('user_weixin')"></Input>
								</FormItem>
								<FormItem :label="$t('user_qq')" prop="qq">
									<Input v-model="formValidate.qq" :placeholder="$t('please')+$t('enter')+$t('user_qq')"></Input>
								</FormItem>
								<FormItem :label="$t('user_email')" prop="email">
									<Input v-model="formValidate.email" :placeholder="$t('please')+$t('enter')+$t('user_email')"></Input>
								</FormItem>
								</Col>
							</Row>
						</TabPane>
						<TabPane :label="$t('user_account')" name="account">
							<FormItem :label="$t('user_account')" prop="account" class="ivu-form-item-required">
								<Input v-model="formValidate.account" :placeholder="$t('please')+$t('enter')+$t('user_account')"></Input>
							</FormItem>
							<FormItem :label="$t('user_password')" prop="password">
								<Input v-model="formValidate.password" :placeholder="$t('please')+$t('enter')+$t('user_password')+'，'+$t('user_password_empty')"></Input>
							</FormItem>
							<FormItem :label="$t('user_auth')">
								<Select v-model="formValidate.roles" multiple>
									<Option v-for="item in role" :value="item.uniqid" :key="item.uniqid">{{ item.name }}</Option>
								</Select>
							</FormItem>
							<FormItem :label="$t('user_is_login')">
								<Checkbox label="is_login" v-model="formValidate.is_login" true-value="yes" false-value="no">
									<span>{{$t('user_account_login')}}</span>
								</Checkbox>
								<Checkbox label="is_mobile" v-model="formValidate.is_mobile" true-value="yes" false-value="no" v-if="formValidate.mobile">
									<span>{{$t('user_mobile_login')}}</span>
								</Checkbox>
							</FormItem>
						</TabPane>
					</Tabs>
					<FormItem>
						<Button type="primary" @click="handleSubmit('formValidate')">{{$t('btn_submit')}}</Button>
					</FormItem>
				</Form>
			</div>
		</Card>
	</div>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				tabs: 'info',
				role: [],
				formValidate: {
					name: '',
					nickname: '',
					mobile: '',
					weixin: '',
					qq: '',
					email: '',
					account: '',
					password: '',
					is_login: 'yes',
					is_mobile: 'yes',
					roles: []
				},
				ruleValidate: {
					name: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('user_name'),
						trigger: 'blur'
					}],
					email: [{
						type: 'email',
						message: that.$t('user_email_format_error'),
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			this.$store.dispatch('readRole').then((result) => {
				this.role = result;
			})
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if (this.formValidate.account == '') {
							this.$Message.error(this.$t('please') + this.$t('enter') + this.$t('user_account'));
							this.tabs = 'account';
							return false;
						}
						this.$store.dispatch('createUser', this.formValidate).then((result) => {
							this.$emit('submit', result);
							this.formValidate = {
								name: '',
								nickname: '',
								mobile: '',
								weixin: '',
								qq: '',
								email: '',
								account: '',
								password: '',
								roles: [],
								is_login: 'yes',
								is_mobile: 'yes'
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	div[tag="user_create"] {
		.ivu-card {
			height: 100%;

			.ivu-card-body {
				height: calc(100% - 51px);
				padding: 0px;

				.scroll-y {
					padding: 10px;
				}
			}
		}
	}
</style>
