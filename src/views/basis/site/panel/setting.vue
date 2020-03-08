<template>
	<Row>
		<Col span="12">
		<Form ref="formItem" :model="formItem" :rules="formRule" :label-width="120">
			<FormItem :label="$t('seo_title')" prop="seo_title">
				<Input v-model="formItem.seo_title" :placeholder="$t('please')+$t('enter')+$t('seo_title')"></Input>
			</FormItem>
			<FormItem :label="$t('seo_keywords')">
				<Input v-model="formItem.seo_keywords" :placeholder="$t('please')+$t('enter')+$t('seo_keywords')"></Input>
			</FormItem>
			<FormItem :label="$t('seo_description')">
				<Input v-model="formItem.seo_description" :placeholder="$t('please')+$t('enter')+$t('seo_description')"></Input>
			</FormItem>
			<FormItem :label="$t('icp_copyright')">
				<Input v-model="formItem.icp_copyright" :placeholder="$t('please')+$t('enter')+$t('icp_copyright')"></Input>
			</FormItem>
			<FormItem :label="$t('police_copyright')">
				<Input v-model="formItem.police_copyright" :placeholder="$t('please')+$t('enter')+$t('police_copyright')"></Input>
			</FormItem>
			<FormItem :label="$t('master_email')">
				<Input v-model="formItem.master_email" :placeholder="$t('please')+$t('enter')+$t('master_email')"></Input>
			</FormItem>
			<FormItem :label="$t('site_state')">
				<i-switch v-model="formItem.site_state" size="large" true-value="1" false-value="0">
					<span slot="open">{{$t('open')}}</span>
					<span slot="close">{{$t('close')}}</span>
				</i-switch>
			</FormItem>
			<FormItem :label="$t('site_close_why')" v-if="formItem.site_state=='0'">
				<Input v-model="formItem.site_close_why" type="textarea" :placeholder="$t('please')+$t('enter')+$t('site_close_why')"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formItem')">{{$t('btn_submit')}}</Button>
			</FormItem>
		</Form>
		</Col>
	</Row>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				formItem: {
					seo_title: '',
					seo_keywords: '',
					seo_description: '',
					icp_copyright: '',
					police_copyright: '',
					master_email: '',
					site_state: '1',
					site_close_why: ''
				},
				formRule: {
					seo_title: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('seo_title'),
						trigger: 'blur'
					}],
				}
			}
		},
		mounted() {
			this.$store.dispatch('readSite', {
				type: 'setting',
			}).then((result) => {
				this.formItem = result.content;
			})
		},
		methods: {
			formVlidate(name, callback) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						callback(this);
					}
				})
			},
			handleSubmit(name) {
				this.formVlidate(name, function(vue) {
					vue.$store.dispatch('submitSite', {
						type: 'setting',
						content: vue.formItem
					}).then(() => {
						vue.$Message.success('success');
					})
				})
			}
		},
	}
</script>

<style>
</style>
