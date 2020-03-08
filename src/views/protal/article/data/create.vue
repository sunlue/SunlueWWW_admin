<template>
	<Card class="create-article-page scroll-y">
		<p slot="title">
			<Icon type="ios-add-circle-outline" :size="18" />
			{{$t('create')}}{{$t('article_content')}}
		</p>
		<a href="#" slot="extra" @click="$emit('back')">
			<Icon type="ios-arrow-back" />
			{{$t('back')}}{{$t('article_list')}}
		</a>
		<Form ref="formVal" :model="form.data" :rules="form.rule" :label-width="80">
			<Tabs :value="tabs">
				<TabPane :label="$t('basis_info')" name="tab_basis">
					<Row>
						<Col span="15">
							<FormItem :label="$t('article_title')" prop="title">
								<Input type="text" v-model="form.data.title" :placeholder="$t('please')+$t('enter')+$t('article_title')"></Input>
							</FormItem>
							<FormItem :label="$t('article_type')" prop="type">
								<Button type="default" long @click="form.treeSelect.show=true">
									<span v-if="!form.data.type">
										{{$t('please')+$t('select')+$t('article_type')}}
									</span>
									<span v-else>{{$t('selected')}}【{{form.treeSelect.selected.name}}】</span>
								</Button>
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
							 <Upload ref="upload" type="drag" accept="image" name="file":show-upload-list="false" 
								:action="$upload.image" :format="['jpg','jpeg','png']" :on-success="uploadSuccess">
								<div style="padding: 16px 0">
									<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
									<p>{{$t('upload_drag')}}</p>
								</div>
							</Upload>
							<div class="preview" v-if="form.data.thumbnail">
								<img :src="$assets.url+form.data.thumbnail" :alt="form.data.title" />
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
		<Modal v-model='form.treeSelect.show' :footer-hide="true" :closable="false">
			<Tree :data="form.treeSelect.data" @on-select-change="handleSelectArticleType"></Tree>
		</Modal>
	</Card>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
	export default{
		components: {
			Tinymce
		},
		data() {
			let that=this
			return {
				form:{
					data:{
						title:'',
						thumbnail:'',
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
						seo_description:''
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
					treeSelect:{
						show:false,
						data:[],
						selected:{
							name:'',
							uniqid:''
						}
					}
				},
				tabs:'tab_basis',
				region:[],
			}
		},
		mounted() {
			this.$store.dispatch('readArticleType').then((data) => {
				this.articleTypeTree(data);
			});
		},
		methods: {
			articleTypeTree(data) {
				let map = new Object(),
					treeArr = new Array();
				data.forEach(function(item) {
					map[item.uniqid] = item;
				});
				data.forEach(function(item) {
					var parent = map[item.pid];
					item['id'] = item['uniqid'];
					item['title'] = item['name'];
					if (parent) {
						(parent.children || (parent.children = [])).push(item);
					} else {
						treeArr.push(item);
					}
				});
				this.form.treeSelect.data=treeArr;
			},
			uploadSuccess(response){
				if(response.code==200){
					this.form.data.thumbnail=response.data.link;
				}else{
					this.$Message.error(response.info)
				}
			},
			handleSelectArticleType (selectArray,item) {
				this.form.treeSelect.selected.uniqid=item.uniqid;
				this.form.data.type=item.uniqid;
				this.form.treeSelect.selected.name=item.name;
				this.form.treeSelect.show=false;
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
			handleSubmit () {
				let that=this,
					data=Object.assign(this.form.data,{
						'tag':this.form.tag
					});
				this.formValidate('formVal',function(){
					that.$store.dispatch('createArticleList',data).then((result) => {
						that.$emit('submit',result);
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
			}
		}
	}
</script>

<style lang="less">
	
	.ivu-input-number{
		width: 100%;
	}
	
	.create-article-page{
		.ivu-upload,.preview{
			margin-bottom: 24px;
		}
	}
	
	.preview{
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
	
	.article_tag{
		.ivu-form-item{
			margin-bottom: 15px;
			&:last-child{
				margin-bottom: 0px;
			}
		}
	}
</style>
