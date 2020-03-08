<template>
	<div tag="system_rights_menu" class="scroll">
		<p class="text-center">
			<span v-if="Object.keys(selectRole).length>0">{{$t('has_select_role')}}：{{selectRole.name}}</span>
			<span v-else>{{$t('todo_select_role')}}</span>
		</p>
		<Button v-if="Object.keys(selectRole).length>0" type="info" long @click="saveRights">
			{{$t('btn_save')+$t('to')}}【{{selectRole.name}}】
		</Button>
		<Tree ref="menuTree" :data="menuTree" show-checkbox multiple check-directly check-strictly></Tree>
	</div>
</template>
<script>
	import router from '@/router/router.js';
	export default {
		data() {
			let that = this;
			return {
				menuTree: [{
					expand: true,
					title: that.$t('root_node'),
					unique: 'root',
					checked: true,
					disabled:true,
					children: []
				}],
				selectRole: {}
			};
		},
		mounted() {
			this.initTree();
		},
		methods: {
			searchTreeNode(id) {
				var temp = {},
					tree = this.menuTree[0]['children'],
					forEach = function(tree, id) {
						for (let i = 0; i < tree.length; i++) {
							let item = tree[i];
							if (item.unique == id) {
								temp = item;
								break;
							} else {
								if (item.children) {
									forEach(item.children, id);
								}
							}
						}
					}
				forEach(tree, id)
				return temp;
			},
			initTree(callback){
				this.$store.dispatch('getNavMenu').then((data)=>{
					this.menuTree[0]['children']=this.renderTree(data)
					typeof callback=='function'?callback():''
				})
			},
			renderTree(data) {
				let that = this,
					menuTree = new Array();
				data.forEach((item) => {
					let node = new Object();
					node['unique'] = item.name;
					node['title'] = that.$t(item.meta.language);
					node['expand'] = true;
					node['checked'] = false;
					if (item.children && item.meta.children!=false && item.meta.display!='hidden') {
						node['children'] = that.renderTree(item.children);
					}
					menuTree.push(node);
				});
				return menuTree;
			},
			saveRights() {
				var rights = new Array(),
					data = this.$refs.menuTree.getCheckedAndIndeterminateNodes();
				data.forEach((item) => {
					if (item.unique != 'root') {
						rights.push(item['unique'])
					}
				})
				this.$store.dispatch('rightsRole', {
					uniqid: this.selectRole.uniqid,
					rights: rights
				}).then(() => {
					this.selectRole.rights = rights;
					this.$Message.success('success');
				});
			},
			setRights(data,rights) {
				let that=this;
				this.initTree(function(){
					rights.forEach((item) => {
						let node = that.searchTreeNode(item);
						node.checked = true;
					})
					that.selectRole = data;
				})
			},
		}
	};
</script>

<style lang="less">
	div[tag="system_rights_menu"] {
		padding: 8px;
	}
</style>
