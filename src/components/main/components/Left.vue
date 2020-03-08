<template>
	<Sider ref="sider" width="220" hide-trigger :collapsible="true" v-model="flag" :collapsed-width="78" breakpoint="xs">
		<div class="left-menu">
			<Menu ref="menu" :active-name="$route.name" theme="dark" width="auto" :accordion="true" 
			:class="classs" :open-names="openMenu" @on-select="selectMenu" @on-open-change="openMenuChange">
				<MenuItem name="main_index" :to="{ name: 'main_index' }">
					<Icon type="ios-navigate"></Icon>
					<!-- <Tooltip content="控制台" placement="right"> -->
						<span class="nav">{{ $t('console') }}</span>
					<!-- </Tooltip> -->
				</MenuItem>
				<div v-for="(nav, index) in navMenu" :key="index">
					<!-- 一级菜单有子级并且设置为显示 -->
					<template v-if="nav.children && nav.meta.children!==false">
						<Submenu :name="nav.name">
							<template slot="title">
								<Icon type="ios-navigate"></Icon>
								<!-- <Tooltip :content="$t(nav.meta.language)" theme="light"> -->
									<span class="nav">{{ $t(nav.meta.language) }}</span>
								<!-- </Tooltip> -->
							</template>
							<template v-for="(menu, j) in nav.children">
								<Submenu :name="menu.name" v-if="menu.children && menu.meta.display != 'hidden'" :key="j">
									<template slot="title" v-if="menu.meta">
										<!-- <Tooltip :content="$t(menu.meta.language)" theme="light"> -->
											<span class="nav">{{ $t(menu.meta.language) }}</span>
										<!-- </Tooltip> -->
									</template>
									<template v-for="(submenu, k) in menu.children">
										<MenuItem v-if="submenu.meta.display != 'hidden'" :name="submenu.name" :key="k" :to="{ name: submenu.name }">
											<!-- <Tooltip :content="$t(submenu.meta.language)" theme="light"> -->
												<span class="nav" :key="k">{{ $t(submenu.meta.language) }}</span>
											<!-- </Tooltip> -->
										</MenuItem>
									</template>
								</Submenu>
								<template v-else>
									<MenuItem :name="menu.name" v-if="menu.meta.display!='hidden'" :to="{ name: menu.name }" :key="j">
										<!-- <Tooltip :content="$t(menu.meta.language)" theme="light"> -->
											<span class="nav" :key="j">{{ $t(menu.meta.language) }}</span>
										<!-- </Tooltip> -->
									</MenuItem>
								</template>
							</template>
						</Submenu>
					</template>
					<!-- 一级菜单无子级 -->
					<template v-else>
						<MenuItem :name="nav.name" :to="{ name: nav.name }" v-if="nav.meta.display!='hidden'">
							<Icon type="ios-navigate"></Icon>
							<!-- <Tooltip :content="$t(nav.meta.language)" theme="light"> -->
								<span class="nav">{{ $t(nav.meta.language) }}</span>
							<!-- </Tooltip> -->
						</MenuItem>
					</template>
				</div>
			</Menu>
		</div>
	</Sider>
</template>
<script>
	export default {
		data() {
			return {
				flag: false,
				isCollapsed: true,
				navMenu:[]
			};
		},
		created(){
			this.$store.dispatch('getNavMenu').then(data => {
				this.navMenu = data;
				this.$nextTick(function() {
					this.$refs.menu.updateActiveName();
					this.$refs.menu.updateOpened();
				});
			});
		},
		computed: {
			classs() {
				return [!this.isCollapsed ? 'close' : 'open'];
			},
			openMenu(){
				return this.$route.matched.map(item => item.name).filter(item => item !== name);
			}
		},
		methods: {	
			shrink() {
				this.isCollapsed = this.flag;
				this.$refs.sider.toggleCollapse();
			},
			selectMenu(){
				this.flag=false;
				this.isCollapsed='open'
			},
			openMenuChange(){
				this.flag=false;
				this.isCollapsed='open'
			}
		}
	};
</script>