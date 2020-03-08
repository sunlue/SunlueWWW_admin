<template>
	<div tag="protal_article_type" class="page">
		<div class="split">
			<Split v-model="split.left">
				<div slot="left" class="split-pane left scroll-y">
					<Tree :data="data" :render="renderArticleType"></Tree>
				</div>
				<div slot="right" class="split-pane right">
					
				</div>
			</Split>
		</div>
		<Modal v-model="modal" :mask-closable="false" :title=" $t(form.action) +$t('article_type')" :footer-hide="false" :closable="false">
			<Form ref="articleTypeForm" :model="form.data" :rules="form.rule" :label-width="120">
				<FormItem :label="$t('article_type_name')" prop="name">
					<Input v-model="form.data.name" :placeholder="$t('please')+$t('enter')+$t('article_type_name')"></Input>
				</FormItem>
				<FormItem :label="$t('article_type_sign')" prop="sign">
					<Input v-model="form.data.sign" :placeholder="$t('please')+$t('enter')+$t('article_type_sign')"></Input>
				</FormItem>
				<FormItem :label="$t('article_type_remark')" prop="remark" style="margin-bottom: 0px;">
					<Input v-model="form.data.remark" type="textarea" :placeholder="$t('please')+$t('enter')+$t('article_type_remark')"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="closeModal('articleTypeForm')">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" @click="createArticleType('articleTypeForm')" v-if="form.action=='create'">{{ $t('btn_confirm') }}</Button>
				<Button type="info" @click="updateArticleType('articleTypeForm')" v-if="form.action=='update'">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
export default {
	data() {
		let that=this;
		return {
			split: {
				left: 0.5
			},
			createArticleTypeData: [],
			updateArticleTypeData: [],
			updateArticleTypeNode: [],
			modal: false,
			form: {
				action:'',
				data: {
					name: '',
					sign: '',
					remark: ''
				},
				rule: {
					name: [
						{
							required: true,
							trigger: 'blur',
							message: that.$t('article_type_name_empty')
						}
					],
					sign: [],
					remark: []
				}
			},
			data: [
				{
					expand: true,
					disable: true,
					title: that.$t('root_node') + '[' + that.$t('article_type') + ']',
					uniqid: 'root',
					render: (h, { root, node, data }) => {
						return h('span',{
								style: {
									display: 'inline-block',
									width: 'calc(100% - 15px)'
								}
							},
							[	
								h('Icon', {
									props: {
										type: 'ios-folder-outline',
										size:16
									},
									style: {
										marginRight: '8px'
									}
								}),
								h('span', [h('span', data.title)]),
								h(
									'span',
									{
										style: {
											display: 'inline-block',
											float: 'right',
										}
									},
									[
										h('Button', {
											props: {
												icon: 'ios-add',
												type: 'info',
												size: 'small'
											},
											style: {
												width: '57px'
											},
											on: {
												click: () => {
													this.createArticleTypeData = data;
													this.form.action='create';
													this.modal = true;
												}
											}
										})
									]
								)
							]
						);
					}
				}
			]
		};
	},
	mounted() {
		let that=this;
		this.readArticleType(function(data){
			that.articleTypeTree(data);
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
				item['expand'] = true;
				item['title'] = item['name'];
				delete item['name'];
				if (parent) {
					(parent.children || (parent.children = [])).push(item);
				} else {
					treeArr.push(item);
				}
			});
			let node = this.data[0];
			this.$set(node, 'children', treeArr);
		},
		renderArticleType(h, { root, node, data }) {
			return h('span',{
					style: {
						display: 'inline-block',
						width: 'calc(100% - 15px)',
					}
				},
				[
					h('span', {
						style:{
							cursor: 'pointer'
						}
					},[
						h('Icon', {
							props: {
								type: 'ios-paper-outline',
								size:16
							},
							style: {
								marginRight: '8px'
							}
						}),
						h('span', data.title)
						]
					),
					h(
						'ButtonGroup',
						{
							style: {
								float: 'right'
							}
						},
						[
							h('Tooltip',{
								props: {
									content:'添加',
								}
							},[
								h('Button', {
									props: {
										icon: 'ios-add',
										type: 'primary',
										size: 'small'
									},
									on: {
										click: () => {
											this.createArticleTypeData = data;
											this.form.action='create';
											this.modal = true;
										}
									}
								})
							]),
							h('Tooltip',{
								props: {
									content:'修改',
								}
							},[
								h('Button', {
									props: {
										icon: 'md-create',
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {
											this.updateArticleTypeData = data;
											this.updateArticleTypeNode = node;
											this.form.action='update';
											this.form.data = {
												name: data.title,
												sign: data.sign,
												remark: data.remark
											};
											this.modal = true;
										}
									}
								})
							]),
							h('Tooltip',{
								props: {
									content:'删除',
								}
							},[
								h('Button', {
									props: {
										icon: 'ios-remove',
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.deleteArticleType(root, node, data);
										}
									}
								}),
							]),
							h('Poptip',{
								props: {
									content:'识别号：'+data.uniqid
								}
							},[
								h('Button', {
									props: {
										icon: 'ios-eye',
										type: 'success',
										size: 'small'
									}
								})
							])
						]
					)
				]
			);
		},
		closeModal(name) {
			this.$refs[name].resetFields();
			this.modal = false;
		},
		formValidate(name,callback){
			this.$refs[name].validate(valid => {
				if (valid) {
					callback();
				}
			});
		},
		createArticleType(name) {
			let that=this,
				data = this.createArticleTypeData;
			this.formValidate(name,function(){
				const children = data.children || [];
				that.$store.dispatch('createArticleType', {
					pid: data.uniqid,
					sign: that.form.data.sign,
					name: that.form.data.name,
					remark: that.form.data.remark
				}).then((result) => {
					children.push({
						uniqid:result.uniqid,
						title: result.name,
						expand: true
					});
					that.$set(data, 'children', children);
					that.closeModal(name);
				});
				
			})
		},
		deleteArticleType(root, node, data) {
			if (node.children && node.children.length>0) {
				let tip = this.$t('tips_node_children_exist');
				this.$Message.warning({
					content: tip,
					duration: 3
				});
				return false;
			}
			let that = this;
			this.$Modal.confirm({
				title: that.$t('tips'),
				content: that.$t('tips_delete_data'),
				onOk: function() {
					that.$store.dispatch('deleteArticleType', {
						uniqid: data.uniqid
					}).then(() => {
						const parentKey = root.find(el => el === node).parent;
						const parent = root.find(el => el.nodeKey === parentKey).node;
						const index = parent.children.indexOf(data);
						parent.children.splice(index, 1);
					});
				}
			});
		},
		updateArticleType(name){
			let that=this,
				data = this.updateArticleTypeData,
				node = this.updateArticleTypeNode;
			this.formValidate(name,function(){
				const children = data.children || [];
				that.$store.dispatch('updateArticleType', {
					uniqid: data.uniqid,
					sign: that.form.data.sign,
					name: that.form.data.name,
					remark: that.form.data.remark
				}).then((result) => {
					data.title=that.form.data.name;
					data.sign=that.form.data.sign;
					data.remark=that.form.data.remark;
					that.closeModal(name);
				});
				
			})
		},
		readArticleType(callback){
			this.$store.dispatch('readArticleType').then((data) => {
				callback(data);
			});
		}
	}
};
</script>

<style lang="less">
	div[tag="protal_article_type"]{
		.split-pane.left{
			padding: 0px 10px;
		}
		.ivu-split-horizontal {
			.ivu-split-trigger-con {
				& + .right-pane {
					left: calc(25% + 6px) !important;
				}
			}
		}
	}
</style>
