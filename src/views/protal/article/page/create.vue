<template>
	<Card class="create-article-page scroll-y">
		<p slot="title">
			<Icon type="ios-add-circle-outline" :size="18" />
			{{$t('create')}}{{$t('article_content')}}
		</p>
		<a href="#" slot="extra" @click="$emit('back')">
			<Icon type="ios-arrow-back" />
			{{$t('back')}}{{$t('article_page')}}
		</a>
		<Form ref="formVal" :model="form.data" :rules="form.rule" :label-width="80">
			<Tabs :value="tabs">
				<TabPane :label="$t('basis_info')" name="tab_basis">
					<Row>
						<Col span="15">
							<FormItem :label="$t('article_title')" prop="title">
								<Input type="text" v-model="form.data.title" :placeholder="$t('please')+$t('enter')+$t('article_title')"></Input>
							</FormItem>
							<FormItem :label="$t('article_excerpt')" prop="excerpt">
								<Input type="textarea" v-model="form.data.excerpt" :placeholder="$t('please')+$t('enter')+$t('article_excerpt')"></Input>
							</FormItem>
							<FormItem :label="$t('article_source')" prop="source">
								<Input type="text" v-model="form.data.source"></Input>
							</FormItem>
							<FormItem :label="$t('article_link')" prop="link">
								<Input type="text" v-model="form.data.link">
									<span slot="prepend">http://&nbsp;||&nbsp;https://</span>
								</Input>
							</FormItem>
							<FormItem :label="$t('article_audio')" prop="audio">
								<Input type="text" v-model="form.data.audio"></Input>
							</FormItem>
							<FormItem :label="$t('article_video')" prop="video">
								<Input type="text" v-model="form.data.video"></Input>
							</FormItem>
							<div style="display: flex;justify-content : space-between;">
								<FormItem :label="$t('article_sort')" prop="sort">
									<InputNumber :min="0" v-model="form.data.sort"></InputNumber>
								</FormItem>
								<FormItem :label="$t('article_hits')" prop="hits">
									<InputNumber :min="0" v-model="form.data.hits"></InputNumber>
								</FormItem>
								<FormItem :label="$t('article_favorites')" prop="favorites">
									<InputNumber :min="0" v-model="form.data.favorites"></InputNumber>
								</FormItem>
								<FormItem :label="$t('article_like')" prop="like">
									<InputNumber :min="0" v-model="form.data.like"></InputNumber>
								</FormItem>
								<FormItem :label="$t('article_comment_count')" prop="comment_count">
									<InputNumber :min="0" v-model="form.data.comment_count"></InputNumber>
								</FormItem>
							</div>
						</Col>
						<Col span="8" offset="1">
							 <Upload ref="upload" type="drag" accept="image" name="file" :show-upload-list="false" :action="upload.url" 
								:format="['jpg','jpeg','png']" :headers="upload.headers" :on-success="uploadSuccess" 
								style="margin-bottom: 24px;">
								<div style="padding: 16px 0">
									<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
									<p>{{$t('upload_drag')}}</p>
								</div>
							</Upload>
							<div class="preview" v-if="upload.result.path">
								<img :src="upload.result.path" :alt="upload.result.name" />
								<div class="deleted">
									<Button type="error">{{$t('delete')}}</Button>
								</div>
							</div>
							<FormItem :label-width="0">
								<div style="display: flex;justify-content : space-around;">
									<FormItem prop="show">
										<i-switch size="large" v-model="form.data.show" true-value="1" false-value="0">
											<span slot="open">{{$t('article_show')}}</span>
											<span slot="close">{{$t('article_hide')}}</span>
										</i-switch>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.quality" true-value="1" false-value="0">
											<span>{{$t('article_quality')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.comment" true-value="1" false-value="0">
											<span>{{$t('article_comment')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.is_top" true-value="1" false-value="0">
											<span>{{$t('article_is_top')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.recommended" true-value="1" false-value="0">
											<span>{{$t('article_recommended')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.hot" true-value="1" false-value="0">
											<span>{{$t('article_hot')}}</span>
										</Checkbox>
									</FormItem>
								</div>
							</FormItem>
						</Col>
					</Row>
				</TabPane>
				<TabPane :label="$t('details_info')" name="tab_content">
					<Tinymce ref="content" v-model="form.data.content" />
				</TabPane>
				<TabPane :label="$t('seo_setting')" name="tab_seo">
					<FormItem :label="$t('seo_title')">
						<Input type="text" v-model="form.data.seo_title"></Input>
					</FormItem>
					<FormItem :label="$t('seo_keywords')">
						<Input type="text" v-model="form.data.seo_keywords"></Input>
					</FormItem>
					<FormItem :label="$t('seo_description')">
						<Input type="text" v-model="form.data.seo_description"></Input>
					</FormItem>
				</TabPane>
				<TabPane :label="$t('attach_upload')" name="tab_attach">
					<Upload ref="uploadfiles" multiple type="drag" :action="upload.file"
						:show-upload-list="false"
						:on-success="handleUploadFileSuccess"
						:on-exceeded-size="handleUploadFilesMaxSize">
						<div style="padding: 20px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>{{$t('upload_drag')}}</p>
						</div>
					</Upload>
					<ul class="attach-upload-list">
						<template v-for="(file,index) in uploadFileList">
							<li :key="index">
								<span><Icon type="md-document" /> {{file.name}}</span>
								<Icon type="ios-close" class="ivu-upload-list-remove" @click.native="handleUploadFileRemove(file,index)" />
							</li>
						</template>
					</ul>
				</TabPane>
				<TabPane :label="$t('image_upload')" name="tab_image">
					<div class="image-upload-list" v-for="(item,index) in uploadImagesList" :key="index">
						<template v-if="item.status === 'finished'">
							<img :src="item.url">
							<div class="cover">
								<Icon type="ios-trash-outline" @click.native="handleUploadImagesRemove(item,index)"></Icon>
							</div>
						</template>
						<template v-else>
							<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						</template>
					</div>
					<Upload ref="uploadimages"
						:action="upload.url"
						:show-upload-list="false"
						:on-success="handleUploadImagesSuccess"
						:format="['jpg','jpeg','png']"
						:on-format-error="handleUploadImagesFormatError"
						:on-exceeded-size="handleUploadImagesMaxSize"
						multiple type="drag" :max-size="2048"
						style="display: inline-block;width:98px;">
						<div style="width: 98px;height:98px;line-height: 98px;">
							<Icon type="ios-camera" size="66"></Icon>
						</div>
					</Upload>
				</TabPane>
				<TabPane :label="$t('other_setting')" name="tab_other">
					<FormItem :label="$t('target')">
						<RadioGroup type="button" v-model="form.data.target">
							<Radio label="_blank">{{$t('target_blank')}}</Radio>
							<Radio label="_self">{{$t('target_self')}}</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem :label="$t('article_tag')" class="article_tag">
						<FormItem :label-width="0" v-for="(item, index) in form.tag" :key="index">
							<Row>
								<Col :xs="{span:16}" :sm="{span:12}" :lg="{span:8}">
									<Col span="18">
										<Input type="text" v-model="item.value" :placeholder="$t('please')+$t('enter')+$t('article_tag')"></Input>
									</Col>
									<Col span="4" offset="1" v-if="form.tag.length>1">
										<Button @click="handleRemoveTag(index)">{{$t('delete')}}</Button>
									</Col>
								</Col>
							</Row>
						</FormItem>
					</FormItem>
					<FormItem>
						<Button type="dashed" icon="md-add" @click="handleCreateTag()">{{$t('create')+$t('article_tag')}}</Button>
					</FormItem>
				</TabPane>
			</Tabs>
			<FormItem>
				<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
				<Button @click="$emit('back')" style="margin-left: 8px">{{$t('back')}}</Button>
			</FormItem>
		</Form>
	</Card>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
	export default{
		components: {
			Tinymce
		},
		data() {
			let that=this,
				upload=this.$assets.upload;
			return {
				uploadImagesList:[],
				uploadFileList:[],
				form:{
					data:{
						title:'',
						type:'',
						excerpt:'',
						source:'',
						link:'',
						audio:'',
						video:'',
						show:'1',
						quality:'1',
						comment:'1',
						is_top:'0',
						recommended:'1',
						hot:'0',
						sort:0,
						hits:0,
						like:0,
						favorites:0,
						comment_count:0,
						content:'',
						target:'_blank',
						seo_title:'',
						seo_keywords:'',
						seo_description:'',
						image_list:[],
						attach_list:[]
					},
					rule:{
						title:[
							{required: true,trigger: 'blur',message: that.$t('please')+that.$t('enter')+that.$t('article_title')},
						],
						type:[
							{required: true,trigger: 'blur',message: that.$t('please')+that.$t('enter')+that.$t('article_type')},
						],
						excerpt:[
							{required: true,trigger: 'blur',message:  that.$t('please')+that.$t('enter')+that.$t('article_excerpt')},
						]
					},
					tag:[{
						value:''
					}],
				},
				tabs:'tab_basis',
				upload: {
					url: upload.image,
					file:upload.file,
					header: {},
					result:{
						path: '',
						name: ''
					}
				},
			}
		},
		mounted() {
			this.uploadImagesList = this.$refs.uploadimages.fileList;
		},
		methods: {
			uploadSuccess(response){
				if(response.code!=200){
					this.$Notice.warning({
						title: this.$t('upload_error'),
						desc: response.info
					});
					return false;
				}
				this.upload.result.path = response.data.link;
				this.upload.result.url = response.data.url+response.data.link;
				this.upload.result.name = response.data.name;
			},
			formValidate(name,callback){
				this.$refs[name].validate((valid) => {
					if(!valid){return false;}
					var data=this.form.data;
					if(data.content.length<1){
						this.$Message.error(this.$t('please')+this.$t('enter')+this.$t('article_content'));
						this.tabs='tab_content';
						return false;
					}
					callback();
				});
			},
			handleReset(){
				this.$refs['formVal'].resetFields();
				this.form.data.content='';
				this.form.data.image_list=[];
				this.form.data.attach_list=[];
			},
			handleSubmit () {
				let that=this,
					data=Object.assign(this.form.data,{
						'tag':this.form.tag,
						'thumbnail':this.upload.result.path
					});
				this.formValidate('formVal',function(){
					that.$store.dispatch('createArticlePage',data).then((result) => {
						that.$emit('submit',result);
						that.handleReset();
					});
				})
			},
			handleCreateTag(){
                this.form.tag.push({
                    value: ''
                });
			},
			handleRemoveTag(index){
				this.form.tag.splice(index,1)
			},
			handleUploadImagesRemove (file,index) {
				let path=this.form.data.image_list[index]['link'];
				this.$store.dispatch('deleteAssets',{
					path:path
				}).then(()=>{
					const fileList = this.$refs.uploadimages.fileList;
					this.$refs.uploadimages.fileList.splice(fileList.indexOf(file), 1);
					this.form.data.image_list.splice(index,1);
				})
			},
			handleUploadImagesSuccess (res, file) {
				file.url = res.data.url+res.data.link;
				file.name = res.data.name;
				this.form.data.image_list.push(res.data);
			},
			handleUploadImagesFormatError (file) {
				this.$Notice.warning({
					title: this.$t('upload_format_error'),
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleUploadImagesMaxSize (file) {
				this.$Notice.warning({
					title: this.$t('upload_file_limit'),
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleUploadFilesMaxSize(file){
				this.$Notice.warning({
					title: this.$t('upload_file_limit'),
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleUploadFileSuccess(res, file){
				if(res.code==200){
					this.uploadFileList.push(res.data);
					this.form.data.attach_list.push(res.data);
				}else{
					this.$Notice.warning({
						title: this.$t('tips'),
						desc: res.info
					});
					return false;
				}
			},
			handleUploadFileRemove(file,index){
				let that=this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteAssets',{
							path:file.link
						}).then(()=>{
							that.form.data.attach_list.splice(index,1);
							that.uploadFileList.splice(index,1);
						})
					}
				});
			}
		}
	}
</script>

<style lang="less">
	
	.ivu-input-number{
		width: 100%;
	}
	
	.create-article-page{
		.preview{
			margin-bottom: 24px;
			border-radius: 5px;
			padding: 4px;
			border: 1px dashed #dcdee2;
			box-sizing: border-box;
			position: relative;
			height: 202px;
			img{
				max-width: 100%;
				max-height: 185px;
				position: absolute;
				left: 50%;top:50%;
				transform: translate(-50%,-50%);
				z-index: 1;
			}
			&:hover{
				.deleted{
					height: 100%;
				}
			}
			.deleted{
				transition: all 1000ms;
				height: 0%;
				overflow: hidden;
				width: 100%;
				background: rgba(0,0,0,.5);
				z-index: 2;
				left: 0px;top: 0px;
				border-radius: 4px;
				position: absolute;
				button{
					position: absolute;
					left: 50%;top:50%;
					transform: translate(-50%,-50%);
				}
			}
		}
		.image-upload-list{
			display: inline-block;
			width: 100px;
			height: 100px;
			text-align: center;
			line-height: 100px;
			border: 1px solid transparent;
			border-radius: 4px;
			overflow: hidden;
			background: #fff;
			position: relative;
			margin-right: 4px;
			img{
				width: 100%;
				height: 100%;
			}
			.cover{
				display: none;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background: rgba(0,0,0,.6);
				i{
					color: #fff;
					font-size: 20px;
					cursor: pointer;
					margin: 0 2px;
				}
			}
			&:hover .cover{
				display: block;
			}
		}
		.attach-upload-list{
			margin-top:8px;
			li{
				cursor: pointer;
				padding: 4px;
				color: #515a6e;
				border-radius: 4px;
				transition: background-color .2s ease-in-out;
				overflow: hidden;
				position: relative;
				.ivu-icon-md-document{
					width: 18px;
					height: 18px;
				}
				.ivu-upload-list-remove{
					margin-top: 4px;
				}
				&:hover{
					background: #f3f3f3;
					.ivu-upload-list-remove{
						opacity: 1;
					}
				}
			}
		}
	}
	
	.article_tag{
		.ivu-form-item{
			margin-bottom: 15px;
			&:last-child{
				margin-bottom: 0px;
			}
		}
	}
</style>
