<template>
	<Footer>
		<Row>
			<Col span="12">
				<Breadcrumb>
					<BreadcrumbItem v-for="(c,i) in breadcrumb" :key="i">{{c.title}}</BreadcrumbItem>
				</Breadcrumb>
			</Col>
			<Col span="12" class="text-right">
				&copy; copyright sunlue.com 2009-2019
			</Col>
		</Row>
	</Footer>
</template>

<script>
	export default {
		computed: {
			breadcrumb(){
				var breadcrumb=new Array();
				this.$route.matched.find(function(route){
					if (route.meta.title) {
						breadcrumb.push({
							name: route.name,
							title: route.meta.title
						})
					} 
				})
				return breadcrumb;
			}
		}
	}
</script>
