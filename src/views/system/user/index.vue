<template>
	<div tag="system_user" class="page">
		<div class="split">
			<Split v-model="split" :min="split" :max="split" mode="vertical">
				<div slot="top" class="split-pane">
					<Form :model="search.form.data" :rules="search.form.rule" :label-width="80" inline>
						<FormItem :label="$t('user_name')">
							<Input type="text" v-model="search.form.data.user_name" :placeholder="$t('please')+$t('enter')+$t('user_name')">
							</Input>
						</FormItem>
						<FormItem :label-width="0">
							<Button type="info" @click="searchArticleList()">{{ $t('btn_search') }}</Button>
						</FormItem>
					</Form>
				</div>
				<div slot="bottom" class="split-pane">
					<datagrid ref="datagrid" v-show="action=='datagrid'" @create="handleCreate" @update="handleUpdate"></datagrid>
					<create v-show="action=='create'" @back=" action='datagrid' " @submit="createUserData"></create>
					<update v-show="action=='update'" @back=" action='datagrid' " @submit="updateUserData" :updateData="todoUpdateData"></update>
				</div>
			</Split>
		</div>
	</div>
</template>

<script>
	import create from './create'
	import update from './update'
	import datagrid from './data'
	export default {
		components: {
			create,
			update,
			datagrid
		},
		data() {
			return {
				action: 'datagrid',
				split: '60px',
				search: {
					form: {
						data: {
							user_name: ''
						},
						rule: {}
					}
				},
				todoUpdateData:{},
				todoUpdateDataIndex:'',
				finishUpdateData:{}
			}
		},
		mounted(){},
		methods: {
			createUserData(data) {
				this.$refs.datagrid.createUser(data)
				this.action = 'datagrid';
			},
			handleCreate(){
				this.action = 'create';
			},
			handleUpdate(data,index){
				this.todoUpdateData=data;
				this.todoUpdateDataIndex=index;
				this.action = 'update';
			},
			updateUserData(data){
				this.action='datagrid';
				this.finishUpdateData=data;
			}
		},
	}
</script>

<style lang="less">
	
	
	.ivu-split-vertical {
		.top-pane {
			.split-pane {
				padding: 10px;
			}
		}

		.ivu-split-trigger-con {
			&+.bottom-pane {
				.split-pane {
					padding: 16px 10px 10px 10px;
				}
			}
		}
	}
</style>
