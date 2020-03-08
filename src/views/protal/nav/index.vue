<template>
	<div tag="protal_nav" class="page">
		<div class="split">
			<Split v-model="split.left">
				<div slot="left" class="split-pane left scroll-y">
					<Tree :data="TreeData" :render="renderNav"></Tree>
				</div>
				<div slot="right" class="split-pane right">
				</div>
			</Split>
		</div>
		<Modal v-model="modal" :mask-closable="false" :title=" $t(form.action) +$t('nav')" :footer-hide="false" 
			:closable="false" :width="600" :styles="{'top':'50px'}" tag="protal_nav">
			<Form ref="navForm" :model="form.data" :rules="form.rule" :label-width="80">
				<FormItem :label="$t('parent_nav')">
					<Input v-model="rootData.title" readonly="readonly"></Input>
				</FormItem>
				<FormItem :label="$t('nav_name')" prop="name">
					<Input v-model="form.data.name" :placeholder="$t('please')+$t('enter')+$t('nav_name')"></Input>
				</FormItem>
				<FormItem :label="$t('nav_url')">
					<Row>
						<Col span="5">
						<RadioGroup v-model="form.data.type" vertical @on-change="changeType">
							<Radio label="1">
								<span>{{$t('article_link')}}</span>
							</Radio>
							<Radio label="2">
								<span>{{$t('article_list')}}</span>
							</Radio>
							<Radio label="3">
								<span>{{$t('article_page')}}</span>
							</Radio>
						</RadioGroup>
						</Col>
						<Col span="19">
						<Input v-model="form.data.url" :placeholder="$t('please')+$t('enter')+$t('nav_url')" v-if="form.data.type=='1'"></Input>
						<Input :placeholder="$t('please')+$t('enter')+$t('nav_url')" v-if="form.data.type!='1'"></Input>
						
						<Button long :disabled="form.data.type=='2'?false:true" @click="form.treeSelect.show=true">
							<span v-if="!form.treeSelect.selected.uniqid">{{$t('please')+$t('select')}}</span>
							<span v-else>{{$t('selected')+'&lt;'+form.treeSelect.selected.name+'&gt;'}}</span>
						</Button>
						
						<Select v-model="form.data.url" :disabled="form.data.type=='3'?false:true">
							<Option v-for="item in articlePage" :value="item.uniqid" :key="item.uniqid">{{ item.title }}</Option>
						</Select>
						</Col>
					</Row>
				</FormItem>
				<FormItem :label="$t('target')">
					<Select v-model="form.data.target">
						<Option value="self">{{$t('target_self')}}</Option>
						<Option value="blank">{{$t('target_blank')}}</Option>
					</Select>
				</FormItem>
				<FormItem :label="$t('nav_show')">
					<Select v-model="form.data.show">
						<Option value="1">{{$t('nav_show')}}</Option>
						<Option value="2">{{$t('nav_hide')}}</Option>
					</Select>
				</FormItem>
				<FormItem :label="$t('nav_sign')" prop="sign">
					<Input v-model="form.data.sign" :placeholder="$t('please')+$t('enter')+$t('nav_sign')"></Input>
				</FormItem>
				<FormItem :label="$t('nav_remark')" prop="remark" style="margin-bottom: 0px;">
					<Input v-model="form.data.remark" type="textarea" :placeholder="$t('please')+$t('enter')+$t('nav_remark')"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="closeModal('navForm')">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" @click="createNav('navForm')" v-if="form.action=='create'">{{ $t('btn_confirm') }}</Button>
				<Button type="info" @click="updateNav('navForm')" v-if="form.action=='update'">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
		<Modal v-model='form.treeSelect.show' :footer-hide="true" :closable="false">
			<Tree :data="form.treeSelect.data" @on-select-change="handleSelectArticleType"></Tree>
		</Modal>
	</div>
</template>
<script>
	export default {
		data() {
			let that = this;
			return {
				split: {
					left: 0.25
				},
				createNavData: [],
				updateNavData: [],
				updateNavNode: [],
				rootData: {},
				modal: false,
				articleType: [],
				articlePage:[],
				form: {
					action: '',
					data: {
						name: '',
						type: '1',
						url: '',
						target: 'self',
						show: '1',
						sign: '',
						remark: ''
					},
					rule: {
						name: [{
							required: true,
							trigger: 'blur',
							message: that.$t('nav_name_empty')
						}],
						sign: [],
						remark: []
					},
					treeSelect: {
						show: false,
						dataArr:[],
						data: [],
						selected: {
							name: '',
							uniqid: ''
						}
					}
				},
				TreeData: [{
					expand: true,
					disable: true,
					title: that.$t('root_node') + '[' + that.$t('nav') + ']',
					uniqid: 'root',
					render: (h, {root,node,data}) => {
						return h('span', {
								style: {
									display: 'inline-block',
									width: 'calc(100% - 15px)'
								}
							},
							[
								h('Icon', {
									props: {
										type: 'ios-folder-outline',
										size: 16
									},
									style: {
										marginRight: '8px'
									}
								}),
								h('span', [h('span', data.title)]),
								h(
									'span', {
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
													this.createNavData = data;
													this.rootData = data;
													this.form.action = 'create';
													this.modal = true;
												}
											}
										})
									]
								)
							]
						);
					}
				}]
			};
		},
		mounted() {
			let that = this;
			this.readNav(function(data) {
				that.navTree(data);
			});
			this.$store.dispatch('readArticleType').then((articleType) => {
				this.articleType = articleType;
				this.articleTypeTree(articleType);
			})
			this.$store.dispatch('readArticlePage').then((articlePage) => {
				this.articlePage=articlePage;
			})
		},
		methods: {
			navTree(data) {
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
				let node = this.TreeData[0];
				this.$set(node, 'children', treeArr);
			},
			renderNav(h, {root,node,data}) {
				return h('span', {
						style: {
							display: 'inline-block',
							width: 'calc(100% - 15px)'
						}
					},
					[
						h('span', {
								style: {
									cursor: 'pointer'
								}
							},
							[
								h('Icon', {
									props: {
										type: 'ios-paper-outline',
										size: 16
									},
									style: {
										marginRight: '8px'
									}
								}),
								h('span', data.title)
							]
						),
						h(
							'ButtonGroup', {
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
										style: {},
										on: {
											click: () => {
												this.createNavData = data;
												this.rootData = data;
												this.form.action = 'create';
												this.modal = true;
											}
										}
									}),
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
										style: {},
										on: {
											click: () => {
												this.updateNavData = data;
												this.updateNavNode = node;
												this.rootData = root[node['parent']].node;
												this.form.action = 'update';
												this.form.data = {
													name: data.title,
													sign: data.sign,
													remark: data.remark,
													type: data.type+'',
													url: data.url,
													target: data.target,
													show: data.show+'',
												};
												if(data.type==2){
													var articleType=this.form.treeSelect.dataArr[data.url]
													this.form.treeSelect.selected.uniqid=articleType.uniqid
													this.form.treeSelect.selected.name=articleType.name
												}
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
												this.deleteNav(root, node, data);
											}
										}
									})
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
					item['expand'] = true;
					if (parent) {
						(parent.children || (parent.children = [])).push(item);
					} else {
						treeArr.push(item);
					}
				});
				this.form.treeSelect.dataArr=map
				this.form.treeSelect.data=treeArr;
			},
			handleSelectArticleType(selectArray, item) {
				console.log(item)
				this.form.treeSelect.selected.uniqid = item.uniqid;
				this.form.treeSelect.selected.name = item.name;
				this.form.treeSelect.show = false;
				this.form.data.url = item.uniqid;
			},
			changeType(){
				this.form.data.url='';
			},
			closeModal(name) {
				this.$refs[name].resetFields();
				this.form.data.type='1'
				this.form.data.url=''
				this.form.treeSelect.selected.uniqid=''
				this.form.treeSelect.selected.name=''
				this.modal = false;
			},
			formValidate(name, callback) {
				this.$refs[name].validate(valid => {
					if (valid) {
						callback();
					}
				});
			},
			createNav(name) {
				let that = this,
					data = this.createNavData;
				this.formValidate(name, function() {
					const children = data.children || [];
					that.$store.dispatch('createNav', {
						pid: data.uniqid,
						sign: that.form.data.sign,
						name: that.form.data.name,
						remark: that.form.data.remark,
						type: that.form.data.type,
						url: that.form.data.url,
						target: that.form.data.target,
						show: that.form.data.show
					}).then((result) => {
						children.push({
							uniqid: result.uniqid,
							title: result.name,
							expand: true
						});
						that.$set(data, 'children', children);
						that.closeModal(name);
					});
				});
			},
			deleteNav(root, node, data) {
				if (data.children && data.children.length > 0) {
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
						that.$store.dispatch('deleteNav', {
							uniqid: data.uniqid
						}).then(() => {
							const parentKey = root.find(el => el === node).parent;
							const parent = root.find(el => el.nodeKey === parentKey).node;
							const index = parent.children.indexOf(data);
							parent.children.splice(index, 1);
							that.$Message.success('success');
						});
					}
				});
			},
			updateNav(name) {
				let that = this,
					data = this.updateNavData;
				this.formValidate(name, function() {
					that.$store.dispatch('updateNav', {
						uniqid: data.uniqid,
						sign: that.form.data.sign,
						name: that.form.data.name,
						remark: that.form.data.remark,
						type: that.form.data.type,
						url: that.form.data.url,
						target: that.form.data.target,
						show: that.form.data.show
					}).then(() => {
						data.title = that.form.data.name;
						data.sign = that.form.data.sign;
						data.remark = that.form.data.remark;
						data.type = that.form.data.type+'';
						data.url = that.form.data.url;
						data.target = that.form.data.target;
						data.show = that.form.data.show+'';
						that.closeModal(name);
					});
				});
			},
			readNav(callback) {
				this.$store.dispatch('readNav').then(data => {
					callback(data);
				});
			}
		}
	};
</script>

<style lang="less">
	div[tag="protal_nav"] {
		.split-pane.left {
			padding: 0px 10px;
		}

		.split-pane.right {
			padding: 10px;
		}

		.ivu-split-horizontal {
			.ivu-split-trigger-con {
				&+.right-pane {
					left: calc(25% + 6px) !important;
				}
			}
		}

		.ivu-radio-group-vertical .ivu-radio-wrapper{
			height: 34px !important;
			line-height: 34px !important;;
		}
	}
</style>
