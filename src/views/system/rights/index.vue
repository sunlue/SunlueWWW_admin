<template>
	<div class="page">
		<div class="split">
			<Split v-model="split.left">
				<div slot="left" class="split-pane no-padding">
					<Split v-model="split.right" mode="horizontal">
						<div slot="left" class="split-pane">
							<rightsRole @rights="getRights" @users="getUsers"></rightsRole>
						</div>
						<div slot="right" class="split-pane">
							<rightsMenu ref="rights"></rightsMenu>
						</div>
					</Split>
				</div>
				<div slot="right" class="split-pane">
					<rightsUser ref="users"></rightsUser>
				</div>
			</Split>
		</div>
	</div>
</template>
<script>
import rightsRole from './role';
import rightsMenu from './menu';
import rightsUser from './user';
export default {
	components: {
		rightsRole,
		rightsMenu,
		rightsUser
	},
	data() {
		return {
			split: {
				left: 0.5,
				right: 0.5
			},
		};
	},
	methods: {
		getRights(data,rights){
			this.$refs.rights.setRights(data,rights);
		},
		getUsers(data,users){
			this.$refs.users.setUsers(data,users);
		}
	}
};
</script>

<style lang="less">
.ivu-split-horizontal {
	.ivu-split-trigger-con {
		& + .right-pane {
			left: calc(50% + 6px) !important;
		}
	}
}
</style>
