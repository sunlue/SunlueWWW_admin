<template>
	<div class="datagrid">
		<ButtonGroup :size="buttonSize">
			<Button :size="buttonSize" type="primary" @click="$emit('create')">{{$t('create')}}</Button>
			<Button :size="buttonSize" type="primary" @click="renderArticle">{{$t('btn_refresh')}}</Button>
		</ButtonGroup>
		<Divider size="small" />
		<div class="datatable">
			<div class="scroll-y">
				<Table ref="datatable" size="small" :columns="datagrid.table.columns" :data="datagrid.table.data" :border="true"
				 :draggable="true" :loading="datagrid.table.loading" @on-selection-change="selectionTable">
					<template slot-scope="{ row,index }" slot="show">
						<i-switch size="large" :value="row.show+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'show',$event)">
							<span slot="open">{{$t('article_show')}}</span>
							<span slot="close">{{$t('article_hide')}}</span>
						</i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="quality">
						<i-switch size="small" :value="row.quality+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'quality',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="comment">
						<i-switch size="small" :value="row.comment+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'comment',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="is_top">
						<i-switch size="small" :value="row.is_top+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'is_top',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="recommended">
						<i-switch size="small" :value="row.recommended+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'recommended',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="hot">
						<i-switch size="small" :value="row.hot+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'hot',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="sort">
						<InputNumber v-model="row.sort" size="small" @on-change="InputNumber(row,index,'sort',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row,index }" slot="hits">
						<InputNumber v-model="row.hits" size="small" @on-change="InputNumber(row,index,'hits',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row,index }" slot="like">
						<InputNumber v-model="row.like" size="small" @on-change="InputNumber(row,index,'like',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row,index }" slot="favorites">
						<InputNumber v-model="row.favorites" size="small" @on-change="InputNumber(row,index,'favorites',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row,index }" slot="comment_count">
						<InputNumber v-model="row.comment_count" size="small" @on-change="InputNumber(row,index,'comment_count',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row }" slot="link">
						<Tooltip :content="row.link" v-if="row.link">
							<Button type="info" size="small" :to="'//'+row.link" target="_blank">
								{{$t('open')}}
							</Button>
						</Tooltip>
					</template>
					<template slot-scope="{ row,index }" slot="action">
						<ButtonGroup>
							<Tooltip :content="$t('btn_update')" placement="left">
								<Button size="small" type="primary" @click="$emit('update',row,index)">
									<Icon type="md-create" />
								</Button>
							</Tooltip>
							<Tooltip :content="$t('btn_delete')" placement="left">
								<Button size="small" type="error" @click="deleteArticle(row,index)">
									<Icon type="ios-trash-outline" />
								</Button>
							</Tooltip>
						</ButtonGroup>
					</template>
				</Table>

			</div>
			<Row style="margin-top:10px;">
				<Col span="12">
				<Page :total="datagrid.paging.total" :current="datagrid.paging.page" :page-size="datagrid.paging.limit"
				 :show-sizer="true" size="small" @on-change="changePage" @on-page-size-change="changePageSize"></Page>
				</Col>
				<Col span="12" class="text-right">
				共计{{datagrid.paging.total}}条数据，
				共计{{Math.ceil(datagrid.paging.total/datagrid.paging.limit)}}页，
				当前第{{datagrid.paging.page}}页
				</Col>
			</Row>
		</div>
		<Drawer v-model="reviewContent.show" width="1000" :draggable='true' :title="$t('review')+$t('article_content')">
			<div v-html="reviewContent.content"></div>
		</Drawer>
	</div>
</template>

<script>
	import expandAudio from './expand/audio'
	import expandVideo from './expand/video'
	import expandThumb from './expand/thumbnail'
	export default {
		data() {
			let that = this;
			return {
				buttonSize: 'small',
				datagrid: {
					table: {
						columns: [{
								width: 50,
								align:'center',
								type: 'index'
							}, {
								width: 80,
								title: '缩略图',
								align: 'center',
								tooltip: 'true',
								render: (h, params) => {
									return h(expandThumb, {
										props: {
											data: params.row,
											thumbnail: params.row.thumbnail
										},
										on: {
											uploadSuccess: (result) => {
												that.uploadImage(params, result)
											}
										}
									})
								}
							},
							{
								title: that.$t('article_title'),
								key: 'title',
								minWidth: 90,
								tooltip: 'true'
							},
							{
								title: that.$t('article_excerpt'),
								key: 'excerpt',
								minWidth: 90,
								tooltip: 'true',
							},
							{
								title: that.$t('article_content'),
								width: 90,
								align: 'center',
								render: (h, params) => {
									let that = this;
									return h('Button', {
										props: {
											size: 'small',
											type: 'info'
										},
										on: {
											click: () => {
												this.reviewContent.show = true;
												this.reviewContent.content = params.row.content;
											}
										}
									}, '查看')
								}
							},
							{
								title: that.$t('article_audio'),
								width: 92,
								align: 'center',
								render: (h, params) => {
									let that = this;
									return h(expandAudio, {
										props: {
											data: params.row,
											audio: params.row.audio
										},
										on: {
											uploadSuccess: (result) => {
												that.uploadAudio(params, result)
											}
										}
									})
								}
							},
							{
								title: that.$t('article_video'),
								width: 92,
								align: 'center',
								render: (h, params) => {
									let that = this;
									return h(expandVideo, {
										props: {
											data: params.row,
											video: params.row.video
										},
										on: {
											uploadSuccess: (result) => {
												that.uploadVideo(params, result)
											}
										}
									})
								}
							},
							{
								title: that.$t('article_show'),
								width: 90,
								align: 'center',
								slot: 'show'
							},
							{
								title: that.$t('article_quality'),
								width: 62,
								align: 'center',
								slot: 'quality'
							},
							{
								title: that.$t('article_comment'),
								width: 62,
								align: 'center',
								slot: 'comment'
							},
							{
								title: that.$t('article_is_top'),
								width: 62,
								align: 'center',
								slot: 'is_top'
							},
							{
								title: that.$t('article_recommended'),
								width: 62,
								align: 'center',
								slot: 'recommended'
							},
							{
								title: that.$t('article_hot'),
								width: 62,
								align: 'center',
								slot: 'hot'
							},
							{
								title: that.$t('article_sort'),
								width: 90,
								align: 'center',
								slot: 'sort'
							},
							{
								title: that.$t('article_hits'),
								width: 90,
								align: 'center',
								slot: 'hits'
							},
							{
								title: that.$t('article_like'),
								width: 90,
								align: 'center',
								slot: 'like'
							},
							{
								title: that.$t('article_favorites'),
								width: 90,
								align: 'center',
								slot: 'favorites'
							},
							{
								title: that.$t('article_comment_count'),
								width: 90,
								align: 'center',
								slot: 'comment_count'
							},
							{
								title: that.$t('article_link'),
								width: 92,
								align: 'center',
								slot: 'link'
							},
							{
								title: '',
								width: 82,
								align: 'center',
								slot: 'action',
								fixed: 'right',
								className: 'col_action'
							},
						],
						data: [],
						loading: false
					},
					paging: {
						total: 0,
						page: 1,
						limit: 10
					}
				},
				reviewContent: {
					show: false,
					content: ''
				},
				finisUpdate: {
					data: {},
					index: ''
				}
			}
		},
		props: {
			finisData: {
				type: Object,
				default: () => {}
			},
			finisDataIndex: {
				type: Number,
				default: 0
			}
		},
		watch: {
			finisData(newValue, oldValue) {
				newValue.show = newValue.show + '';
				newValue.comment = newValue.comment + '';
				newValue.is_top = newValue.is_top + '';
				newValue.recommended = newValue.recommended + '';
				newValue.hot = newValue.hot + '';
				this.finisUpdate.data = newValue;
			},
			finisDataIndex(newValue) {
				this.finisUpdate.index = newValue;
			}
		},
		mounted() {
			this.renderArticle();
		},
		methods: {
			changePage(pageNumber) {
				this.datagrid.paging.page=pageNumber;
				this.renderArticle()
			},
			changePageSize(PageSize) {
				this.datagrid.paging.page=pageNumber;
				this.datagrid.paging.limit = PageSize;
				this.renderArticle()
			},
			searchArticle(where) {
				this.datagrid.paging.page = 1;
				this.renderArticle(where)
			},
			renderArticle(where, callback) {
				this.datagrid.table.loading = true;
				this.$store.dispatch('readArticleList', Object.assign(where?where:{},{
					page:this.datagrid.paging.page,
					limit:this.datagrid.paging.limit
				})).then((result) => {
					this.datagrid.table.data = result.data;
					this.datagrid.table.loading = false;
					this.datagrid.paging.total = result.total;
					this.datagrid.paging.current = result.current_page;
					typeof(callback) == 'function' ? callback(result): '';
				});
			},
			createArticle(data) {
				this.datagrid.table.data.push(data);
				this.datagrid.paging.total+=1
			},
			updateArticle(row, index) {
				this.$emit('update', row, index)
			},
			deleteArticle(row, index) {
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteArticleList', {
							uniqid: row.uniqid,
						}).then((result) => {
							that.datagrid.table.data.splice(index, 1);
							that.datagrid.paging.total-=1
						});
					}
				});
			},
			selectionTable() {},
			batchDeleteArticle() {},
			uploadImage(params, result) {
				let that = this,
					index = params.index,
					row = params.row,
					url = result.url,
					value = result.link;
				that.handleField(row.uniqid, 'thumbnail', value, function() {
					that.datagrid.table.data[index]['thumbnail'] = url + value;
				})
			},
			uploadAudio(params, result) {
				let that = this,
					index = params.index,
					row = params.row,
					url = result.url,
					value = result.link;
				that.handleField(row.uniqid, 'audio', value, function() {
					that.datagrid.table.data[index]['audio'] = url + value;
				})
			},
			uploadVideo(params, result) {
				let that = this,
					index = params.index,
					row = params.row,
					url = result.url,
					value = result.link;
				that.handleField(row.uniqid, 'video', value, function() {
					that.datagrid.table.data[index]['video'] = url + value;
				})
			},
			handleSwitch(row, index, field, value) {
				let that = this;
				that.handleField(row.uniqid, field, value, function() {
					that.datagrid.table.data[index][field] = value;
				})
			},
			handleField(uniqid, field, value, callback) {
				this.$store.dispatch('updateArticleList', {
					uniqid: uniqid,
					field: field,
					value: value
				}).then((result) => {
					typeof(callback) == 'function' ? callback(result): '';
				});
			},
			InputNumber(row, index, field, value) {
				this.handleField(row.uniqid, field, value);
			},
			exportCsv() {
				this.$refs.datatable.exportCsv({
					filename: this.$t('article_list'),
					original: true,
					columns: this.datagrid.table.columns,
					data: this.datagrid.table.data
				})
			}
		},
	}
</script>
<style lang="less">
	.datagrid {
		height: 100%;

		.datatable {
			height: 100%;

			.scroll-y {
				height: calc(100% - 81px);
			}
		}
	}

	.col_action {
		.ivu-table-cell {
			padding-left: 10px;
			padding-right: 10px;
		}
	}
</style>
