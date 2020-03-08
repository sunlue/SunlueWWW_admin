<template>
	<Header>
		<div class="logo">
			<img src="../../../assets/index/logo.png" />
		</div>
		<div class="menu">
			<Menu mode="horizontal" theme="dark" :active-name="$route.name">
				<template v-for="(menuItem) in menu">
					<MenuItem :name="menuItem.name" :key="menuItem.name" 
						:to="{name:menuItem.name}">
						{{menuItem.meta.title}}
					</MenuItem>
					<!-- <Submenu v-else :name="menuItem.name" v-bind:key="menuItem.name">
						<template slot="title">
							{{menuItem.meta.title}}
						</template>
						<template v-for="(childMenu) in menuItem.children">
							<MenuItem :name="childMenu.name" :key="childMenu.name" :to="{name:childMenu.name}">{{childMenu.meta.title}}</MenuItem>
						</template>
					</Submenu> -->
				</template>
			</Menu>
		</div>
		<div class="right">
			<Dropdown @on-click="userAction">
				<a href="javascript:void(0)">
					{{$t('hello')}}！{{userInfo.name || userInfo.account}}
					<Icon :size="18" type="md-arrow-dropdown" />
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="basis_info" v-if="false">{{$t('my_info')}}</DropdownItem>
					<DropdownItem name="edit_password" v-if="false">{{$t('edit_password')}}</DropdownItem>
					<DropdownItem name="logout" divided>{{$t('logout_login')}}</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Icon :size="24" color="white" type="md-more" @click="drawers()" />
		</div>
		<Drawer :title="drawer.title" v-model="drawer.show">
			
		</Drawer>
	</Header>
</template>

<script>
	import menu from '@/router/plugin';
	export default {
		data() {
			let that = this;
			return {
				menu:menu.children,
				userInfo: {},
				drawer: {
					show: false,
					title: that.$t('system_info')
				}
			};
		},
		created() {
			this.userInfo = this.$store.getters.userInfo;
		},
		methods: {
			userAction(name) {
				this[name]();
			},
			drawers() {
				this.drawer.show = !this.drawer.show;
			},
			basis_info() {
				console.log(this.$store.getters.userInfo)
			},
			edit_password() {

			},
			logout() {
				var that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_exit_system'),
					onOk: function() {
						that.$store.dispatch('exit').then(() => {
							that.$router.replace({
								name: 'login'
							});
						})
					}
				});
			}
		}
	};
</script>
