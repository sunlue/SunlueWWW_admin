<template>
	<Sider ref="sider" width="220" hide-trigger :collapsible="true" breakpoint="xs">
		<Menu theme="dark" active-name="1" width="220px" @on-select="select">
			<template v-for="(item,index) in menu">
				<MenuItem :name="item.name" :key="index">
					{{item.title}}
				</MenuItem>
			</template>
		</Menu>
	</Sider>
</template>

<script>
	export default{
		data() {
			return {
			}
		},
		props: {
			menu: {
				type: Array,
				default: ()=>{}
			},
		},
		watch: {
			'$route'(newValue, oldValue) {
				console.log(newValue)
			}
		},
		mounted(){
			var routes = {
				children: this.$router.options.routes
			};
			var route = this.$route.matched;

			for(var i=0; i<route.length-1; i++){
				routes = routes.children.find((e) => (e.name == route[i].name));
			}
			console.log(this.$router.options.routes)
			console.log(routes.children)
			console.log(route)
			
			routes.children.find((m)=>{
				console.log(m.name)
			})
			
		},
		methods: {
			select() {
				
			}
		},
	}
</script>

<style lang="less">
	.ivu-layout-has-sider.ivu-layout{
		height: 100%;
		
		.ivu-layout-sider{
			height: 100%;
		}
	}
</style>
