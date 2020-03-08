<template>
	<div tab="protal_article_list" class="page">
		<div class="split">
			<Split v-model="split" mode="vertical">
				<div slot="top" class="split-pane">
					<Form ref="formInline" :model="search.form.data" :rules="search.form.rule" :label-width="80" inline>
						<FormItem :label="$t('article_type')">
							<stree
								v-model="treeSelect.Selected"
								:check-strictly="true"
								:expand-all="true"
								:data="treeSelect.data"
							></stree>
						</FormItem>
						<FormItem :label="$t('article_title')" prop="title">
							<Input type="text" v-model="search.form.data.title" :placeholder="$t('please')+$t('enter')+$t('article_title')">
							</Input>
						</FormItem>
						<FormItem :label-width="0">
							<Button type="info" @click="searchArticleList()">{{ $t('btn_search') }}</Button>
						</FormItem>
					</Form>
				</div>
				<div slot="bottom" class="split-pane">
					<data-grid ref="datagrid" v-show="action=='datagrid'" :finisData="finishUpdateData" :finisDataIndex="todoUpdateDataIndex" @create="handleCreate" @update="handleUpdate"></data-grid>
					<create-page ref="createpage" v-if="action=='create'" :treeSelectData="treeSelect.data" @back=" action='datagrid' " @submit="createArticleData"></create-page>
					<update-page ref="updatepage" v-show="action=='update'" :treeSelectData="treeSelect.data" :updateData="todoUpdateData" @back=" action='datagrid' " @submit="updateArticleData"></update-page>
				</div>
			</Split>
		</div>
	</div>
</template>

<script>
	import stree from '@/components/sTree'
	import dataGrid from './grid'
	import createPage from './create'
	import updatePage from './update'
	export default{
		components: {
			dataGrid,
			createPage,
			updatePage,
			stree
		},
		data(){
			return{
				action:'datagrid',
				split:'60px',
				search:{
					form:{
						data:{
							title:'',
						},
						rule:{
							title:[]
						}
					},
					region:[]
				},
				treeSelect:{
					selected:[],
					data:[]
				},
				todoUpdateData:{},
				todoUpdateDataIndex:0,
				finishUpdateData:{}
			}
		},
		mounted(){
			let that=this;
			this.$store.dispatch('readArticleType').then((data) => {
				this.articleTypeTree(data)
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
				this.treeSelect.data=treeArr;
			},
			searchArticleList(){
				this.$refs.datagrid.searchArticle({
					type:this.treeSelect.Selected,
					title:this.search.form.data.title
				});
			},
			handleCreate(){
				this.action='create';
			},
			handleUpdate(data,index){
				data['timeStamp']=new Date().getTime()
				this.todoUpdateData=data;
				this.todoUpdateDataIndex=index;
				this.action='update';
			},
			createArticleData(data){
				this.$refs.datagrid.createArticle(data)
				this.action='datagrid';
			},
			updateArticleData(data){
				this.finishUpdateData=data;
				this.action='datagrid';
			}
		}
	}
	
</script>

<style lang="less">
	.ivu-split-vertical {
		.top-pane {
			.split-pane{
				padding: 10px;
			}
		}
		.ivu-split-trigger-con {
			& + .bottom-pane {
				.split-pane{
					padding: 16px 10px 10px 10px;
				}
			}
		}
	}
</style>
