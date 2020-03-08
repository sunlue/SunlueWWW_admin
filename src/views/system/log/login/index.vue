<template>
	<div class="page" tag="log_login">
		<div class="scroll-y">
			<Table :columns="columns" :data="data" :border="true"></Table>
			<Divider />
			<Row style="margin-top: 10px;">
				<Col span="12">
				<Page :total="paging.total" :current="paging.page" :page-size="paging.limit"
				 :show-sizer="true" @on-change="changePage" @on-page-size-change="changePageSize"></Page>
				</Col>
				<Col span="12" class="text-right">
				共计{{paging.total}}条数据，
				共计{{Math.ceil(paging.total/paging.limit)}}页，
				当前第{{paging.page}}页
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let that=this;
			return {
				columns: [{
					type: 'index',
					width: 56,
					align:'center'
				}, {
					key: 'uniqid',
					title: that.$t('log_number')
				}, {
					key: 'userid',
					title: that.$t('user_number')
				}, {
					width:96,
					align:'center',
					key: 'account',
					title: that.$t('user_account')
				}, {
					width:100,
					align:'center',
					key: 'name',
					title: that.$t('user_name')
				}, {
					width:100,
					align:'center',
					key: 'nickname',
					title: that.$t('user_nickname')
				}, {
					width:180,
					align:'center',
					key: 'login_time',
					title: that.$t('user_login_time')
				}, {
					width:180,
					align:'center',
					key: 'exit_time',
					title: that.$t('user_exit_time')
				},{
					width:96,
					align:'center',
					key: 'date_diff',
					fixed:'right',
					title: that.$t('user_date_diff')
				}, {
					width:128,
					align:'center',
					key: 'ip',
					fixed:'right',
					title: that.$t('user_login_ip')
				}],
				data: [],
				paging: {
					total: 0,
					page: 1,
					limit: 20
				}
			}
		},
		mounted() {
			this.$store.dispatch('readLogLogin', {
				page: this.paging.page,
				limit: this.paging.limit
			}).then((data) => {
				this.data = data.data;
				this.paging.total = data.total;
			})
		},
		methods: {
			changePage(pageNumber) {
				this.$store.dispatch('readLogLogin', {
					page: pageNumber,
					limit: this.paging.limit
				}).then((data) => {
					this.data = data.data;
					this.paging.total = data.total;
				})
			},
			changePageSize(PageSize) {
				this.paging.pageSize = PageSize;
				this.$store.dispatch('readLogLogin', {
					page: 1,
					limit: PageSize
				}).then((data) => {
					this.data = data.data;
					this.paging.total = data.total;
				})
			}
		}
	}
</script>

<style lang="less">
	div[tag="log_login"] {
		padding: 0px;
		.scroll-y {
			padding: 10px;
			position: absolute;
		}
	}
</style>
