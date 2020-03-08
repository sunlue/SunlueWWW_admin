<template>
	<Row>
		<Col span="12">
		<Form ref="formItem" :model="formItem" :rules="formRule" :label-width="120">
			<FormItem :label="$t('file_upload_type')" prop="file_upload_type">
				<Input v-model="formItem.file_upload_type" :placeholder="$t('please')+$t('enter')+$t('file_upload_type')"></Input>
				<p>{{$t('upload_type_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('file_upload_size')" prop="file_upload_size">
				<Input v-model="formItem.file_upload_size" :placeholder="$t('please')+$t('enter')+$t('file_upload_size')"></Input>
				<p>{{$t('upload_size_tips')}}[{{formItem.file_upload_size/1024}}M]</p>
			</FormItem>
			<FormItem :label="$t('audio_upload_type')" prop="audio_upload_type">
				<Input v-model="formItem.audio_upload_type" :placeholder="$t('please')+$t('enter')+$t('audio_upload_type')"></Input>
				<p>{{$t('upload_type_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('audio_upload_size')" prop="audio_upload_size">
				<Input v-model="formItem.audio_upload_size" :placeholder="$t('please')+$t('enter')+$t('audio_upload_size')"></Input>
				<p>{{$t('upload_size_tips')}}[{{formItem.audio_upload_size/1024}}M]</p>
			</FormItem>
			<FormItem :label="$t('video_upload_type')" prop="video_upload_type">
				<Input v-model="formItem.video_upload_type" :placeholder="$t('please')+$t('enter')+$t('video_upload_type')"></Input>
				<p>{{$t('upload_type_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('video_upload_size')" prop="video_upload_size">
				<Input v-model="formItem.video_upload_size" :placeholder="$t('please')+$t('enter')+$t('video_upload_size')"></Input>
				<p>{{$t('upload_size_tips')}}[{{formItem.video_upload_size/1024}}M]</p>
			</FormItem>
			<FormItem :label="$t('image_upload_type')" prop="image_upload_type">
				<Input v-model="formItem.image_upload_type" :placeholder="$t('please')+$t('enter')+$t('image_upload_type')"></Input>
				<p>{{$t('upload_type_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('image_upload_size')" prop="image_upload_size">
				<Input v-model="formItem.image_upload_size" :placeholder="$t('please')+$t('enter')+$t('image_upload_size')"></Input>
				<p>{{$t('upload_size_tips')}}[{{formItem.image_upload_size/1024}}M]</p>
			</FormItem>
			<FormItem :label="$t('image_max_size')">
				<Row>
					<Col span="11">
					<FormItem prop="date">
						<Input v-model="formItem.image_max_width">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
					<Col span="2" style="text-align: center">-</Col>
					<Col span="11">
					<FormItem prop="time">
						<Input v-model="formItem.image_max_height">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
				<p>{{$t('max_size_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('image_crop_xyz')">
				<Row>
					<Col span="11">
					<FormItem prop="date">
						<Input v-model="formItem.image_crop_x">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
					<Col span="2" style="text-align: center">-</Col>
					<Col span="11">
					<FormItem prop="time">
						<Input v-model="formItem.image_crop_y">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
				<p>{{$t('corp_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('watermark_type')">
				<RadioGroup v-model="formItem.watermark_type">
					<Radio label="1">{{$t('close')}}</Radio>
					<Radio label="2">{{$t('text')}}</Radio>
					<Radio label="3">{{$t('image')}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem :label="$t('watermark_location')" v-if="formItem.watermark_type!='1'">
				<RadioGroup v-model="formItem.watermark_location">
					<Radio label="1">{{$t('left')+$t('top')}}</Radio>
					<Radio label="2">{{$t('center')+$t('top')}}</Radio>
					<Radio label="3">{{$t('bottom')+$t('top')}}</Radio>
					<Radio label="4">{{$t('left')+$t('center')}}</Radio>
					<Radio label="5">{{$t('center')}}</Radio>
					<Radio label="6">{{$t('right')+$t('center')}}</Radio>
					<Radio label="7">{{$t('left')+$t('bottom')}}</Radio>
					<Radio label="8">{{$t('center')+$t('bottom')}}</Radio>
					<Radio label="9">{{$t('right')+$t('bottom')}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem :label="$t('watermark_text')" v-if="formItem.watermark_type=='2'">
				<Row>
					<Col span="8">
					<FormItem prop="date">
						<Input :placeholder="$t('sunlue')" v-model="formItem.watermark_text"></Input>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem prop="time">
						<Select v-model="formItem.watermark_style">
							<Option>微软雅黑</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="8">
					<FormItem prop="time">
						<Input :placeholder="$t('font_size')" v-model="formItem.watermark_size">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
			</FormItem>
			<FormItem :label="$t('watermark_file')" v-if="formItem.watermark_type=='3'">
				<Upload action="//jsonplaceholder.typicode.com/posts/">
					<Button icon="ios-cloud-upload-outline">{{$t('upload_select')}}</Button>
				</Upload>
			</FormItem>
			<FormItem :label="$t('watermark_opacity')" v-if="formItem.watermark_type!='1'">
				<Input v-model="formItem.watermark_opacity"></Input>
				<p>{{$t('opacity_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('thumb_max_size')">
				<Row>
					<Col span="11">
					<FormItem prop="date">
						<Input v-model="formItem.thumb_max_width">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
					<Col span="2" style="text-align: center">-</Col>
					<Col span="11">
					<FormItem prop="time">
						<Input v-model="formItem.thumb_max_height">
						<span slot="append">px</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
				<p>{{$t('thumb_size_tips')}}</p>
			</FormItem>
			<FormItem :label="$t('thumb_core_type')" v-if="formItem.thumb_max_width>0 && formItem.thumb_max_height>0">
				<RadioGroup v-model="formItem.thumb_core_type">
					<Radio label="1">{{$t('thumb_zoom')}}</Radio>
					<Radio label="2">{{$t('thumb_padding')}}</Radio>
					<Radio label="3">{{$t('thumb_crop_center')}}</Radio>
					<Radio label="4">{{$t('thumb_crop_left_top')}}</Radio>
					<Radio label="5">{{$t('thumb_crop_right_bottom')}}</Radio>
					<Radio label="6">{{$t('thumb_crop_fixed')}}</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem :label="$t('thumb_quality')" v-if="formItem.thumb_max_width>0 && formItem.thumb_max_height>0">
				<Input v-model="formItem.thumb_quality"></Input>
				<p>{{$t('watermark_tips')}}</p>
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
					file_upload_type: 'rar,zip,doc,xls,txt,pdf,mp3,mp4,jpg,gif,png,jpeg,docx',
					file_upload_size: '2048',
					audio_upload_type: 'flv,mp3,mp4,avi',
					audio_upload_size: '10240',
					video_upload_type: 'flv,mp3,mp4,avi',
					video_upload_size: '20480',
					image_upload_type: 'gif,jpg,png,bmp,jpeg',
					image_upload_size: '2048',
					image_max_width: '600',
					image_max_height: '400',
					image_crop_x: 0,
					image_crop_y: 0,
					watermark_type: '1',
					watermark_location: '9',
					watermark_text: '',
					watermark_style: '',
					watermark_size: '',
					watermark_opacity: '0.5',
					thumb_max_width: '0',
					thumb_max_height: '0',
					thumb_core_type: '2',
					thumb_quality: '80'
				},
				formRule: {
					file_upload_type: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('file_upload_type'),
						trigger: 'blur'
					}],
					file_upload_size: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('file_upload_size'),
						trigger: 'blur'
					}],
					audio_upload_type: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('audio_upload_type'),
						trigger: 'blur'
					}],
					audio_upload_size: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('audio_upload_size'),
						trigger: 'blur'
					}],
					video_upload_type: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('video_upload_type'),
						trigger: 'blur'
					}],
					video_upload_size: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('video_upload_size'),
						trigger: 'blur'
					}],
					image_upload_type: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('image_upload_type'),
						trigger: 'blur'
					}],
					image_upload_size: [{
						required: true,
						message: that.$t('please') + that.$t('enter') + that.$t('image_upload_size'),
						trigger: 'blur'
					}]
				}
			}
		},
		mounted(){
			this.$store.dispatch('readSite', {
				type: 'upload',
			}).then((result) => {
				this.formItem=result.content;
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
						type: 'upload',
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
