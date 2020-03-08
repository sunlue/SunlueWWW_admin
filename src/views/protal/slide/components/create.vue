<template>
	<Row>
		<Form ref="slideForm" :model="form.data" :rules="form.rule" :label-width="100">
			<Col span="15">
			<FormItem :label="$t('nav_name')">
				<Input v-model="navData.title" readonly="readonly"></Input>
			</FormItem>
			<FormItem :label="$t('slide')+$t('slide_name')" prop="name">
				<Input v-model="form.data.name" :placeholder="$t('please')+$t('enter')+$t('slide_name')"></Input>
			</FormItem>
			<FormItem :label="$t('slide_link')">
				<Input v-model="form.data.link" :placeholder="$t('please')+$t('enter')+$t('slide_link')"></Input>
			</FormItem>
			<FormItem :label="$t('slide_sign')">
				<Input v-model="form.data.sign" :placeholder="$t('please')+$t('enter')+$t('slide_sign')"></Input>
			</FormItem>
			<FormItem :label="$t('slide_remark')">
				<Input v-model="form.data.remark" type="textarea" :placeholder="$t('please')+$t('enter')+$t('slide_remark')"></Input>
			</FormItem>
			</Col>
			<Col span="8" offset="1">
			<FormItem :label-width="0">
				<Upload ref="upload" type="drag" accept="image/png,image/jpeg,image/gif" :show-upload-list="false" :action="form.upload.url"
				 :format="['jpg','jpeg','png']" name="file" :headers="form.upload.headers" :on-success="uploadSuccess">
					<div style="padding: 2px 0">
						<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						<p>{{$t('upload_drag')}}</p>
					</div>
				</Upload>
			</FormItem>
			<FormItem :label-width="0" v-if="form.upload.result.path">
				<div class="upload-preview">
					<img :src="form.upload.result.path" />
				</div>
			</FormItem>
			</Col>
		</Form>
	</Row>
</template>

<script>
	export default {
		data() {
			let that = this,
				uploadImage = this.$assets.upload.image;
			return {
				model:false,
				form: {
					action: 'create',
					data: {
						name: '',
						link: '',
						sign: '',
						remark: '',
						image:''
					},
					rule: {
						name: [{
							required: true,
							trigger: 'blur',
							message: that.$t('slide_name_empty')
						}]
					},
					upload: {
						url: uploadImage,
						header: {},
						result: {
							path: '',
							name: ''
						}
					},
				},
			}
		},
		props: {
			navData: {
				type: Object,
				default: () => {}
			}
		
		},
		watch: {
			navData(newValue) {
				this.navData = newValue;
			}
		},
		methods: {
			uploadSuccess(response) {
				this.form.upload.result.path = response.data.url + response.data.link;
				this.form.upload.result.name = response.data.name;
				this.form.data.image = response.data.link;
			},
			formValidate(name, callback) {
				this.$refs[name].validate(valid => {
					if (valid) {
						if(this.form.image==''){
							this.$Message.error(this.$t('please')+this.$t('upload')+this.$t('image'));
							return false;
						}
						callback();
					}
				});
			},
			resetFields(){
				this.form.data={
					name: '',
					link: '',
					sign: '',
					remark: '',
					image:''
				}
			}
		}
	}
</script>

<style>
</style>
