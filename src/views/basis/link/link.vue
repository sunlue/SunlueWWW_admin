<template>
	<Row tag="link_page">
		<Form ref="linkForm" :model="form.data" :rules="form.rule" :label-width="88">
			<Col span="15">
			<FormItem :label="$t('target')">
				<RadioGroup v-model="form.data.target">
					<Radio label="1">{{$t('target_self')}}</Radio>
					<Radio label="2">{{$t('target_blank')}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem :label="$t('link_name')" prop="name">
				<Input v-model="form.data.name" :placeholder="$t('please')+$t('enter')+$t('link_name')"></Input>
			</FormItem>
			<FormItem :label="$t('link_url')" prop="link">
				<Input v-model="form.data.link" :placeholder="$t('please')+$t('enter')+$t('link_url')"></Input>
			</FormItem>
			<FormItem :label="$t('remark')">
				<Input type="textarea" v-model="form.data.remark" :placeholder="$t('please')+$t('enter')+$t('remark')"></Input>
			</FormItem>
			</Col>
			<Col span="8" offset="1">
			<FormItem :label-width="0">
				<Upload :action="upload.url" :show-upload-list="false" :format="['png','jpg','jpeg','gif']" name="file" type="drag"
				 :on-success="uploadSuccess" :on-error="uploadError" :on-format-error="uploadFormatError">
					<div style="padding: 10px 0;">
						<Icon type="ios-cloud-upload" size="38" style="color: #3399ff"></Icon>
						<p>{{$t('upload_drag')}}</p>
					</div>
				</Upload>
			</FormItem>
			<FormItem :label-width="0" v-if="upload.linkpath" style="margin-bottom: 0px;">
				<div class="upload-preview">
					<img :src="upload.linkpath" />
				</div>
			</FormItem>
			</Col>
		</Form>
	</Row>
</template>

<script>
	export default {
		data() {
			let that = this;
			let uploadImg = this.$assets.upload.image;
			return {
				upload: {
					linkpath: '',
					url: uploadImg,
				},
				form: {
					data: {
						target: '1',
						name: '',
						link: '',
						icon: '',
						remark: ''
					},
					rule: {
						name: [{
							required: true,
							trigger: 'blur',
							message: that.$t('link_name_empty')
						}],
						link: [{
							required: true,
							trigger: 'blur',
							message: that.$t('link_url_empty')
						}],
					}
				},
				update: {}
			}
		},
		methods: {
			uploadSuccess(response) {
				this.upload.linkpath = response.data.url + response.data.link;
				this.form.data.icon = response.data.link;
			},
			uploadError(error) {
				console.error(error)
			},
			uploadFormatError(file) {
				this.$Message.error('文件[' + file.name + ']格式错误');
			},
			formValidate(name, callback) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						if (this.form.data.icon == '') {
							this.$Message.error(this.$t('please') + this.$t('upload') + this.$t('image'));
							return false;
						}
						callback();
					}
				});
			},
			handleCreateSubmit(name) {
				let that = this;
				this.formValidate(name, function() {
					that.$store.dispatch('createLink', that.form.data).then((result) => {
						that.$emit('createComplete', result);
						that.$refs[name].resetFields();
					});
				});
			},
			resetForm(name) {
				this.$refs[name].resetFields();
			},
			handleUpdate(update) {
				let data = new Object();
				data.target = update.target + '';
				data.name = update.name + '';
				data.link = update.link + '';
				data.icon = update.icon + '';
				data.remark = update.remark + '';
				this.form.data = data;
				this.update = update;
				this.upload.linkpath = update.icon;
			},
			handleUpdateSubmit(name) {
				let that = this,
					data = Object.assign(that.form.data, {
						uniqid: that.update.uniqid
					});
				this.formValidate(name, function() {
					that.$store.dispatch('updateLink', data).then((result) => {
						that.$emit('updateComplete', result);
						that.$refs[name].resetFields();
					});
				});
			}
		}
	}
</script>

<style lang="less">
	div[tag="link_page"]{
		.upload-preview{
			img{
				width: 100%;
				max-height: 110px;
			}
		}
	}
</style>
