<template>
	<Tree :data="data" :render="renderNav"></Tree>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				data: [{
					expand: true,
					disable: true,
					title: that.$t('root_node') + '[' + that.$t('slide') + ']',
					uniqid: 'root',
					render: (h, {
						root,
						node,
						data
					}) => {
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
											float: 'right'
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
													this.navTreeClick(root,node,data)
												}
											}
										})
									]
								)
							]
						);
					}
				}]
			}
		},
		mounted() {
			let that = this;
			this.readNav(function(data) {
				that.navTree(data);
			});
		},
		methods: {
			readNav(callback) {
				this.$store.dispatch('readNav').then(data => {
					callback(data);
				});
			},
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
				let node = this.data[0];
				this.$set(node, 'children', treeArr);
			},
			renderNav(h, {root,node,data}) {
				return h('span', {
						style: {
							display: 'inline-block',
							width: 'calc(100% - 15px)'
						},
						on:{
							click:()=>{
								this.$emit('select',root,node,data)
							}
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
									props:{
										content:'添加幻灯片'
									}
								},[
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
												this.navTreeClick(root,node,data)
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
			navTreeClick(root,node,data){
				this.$emit('create',root,node,data)
			}
		},
	}
</script>

<style>
</style>
