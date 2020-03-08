<template>
	<div>
		<Button type="info" size="small" @click="show = true">{{ $t('review') }}</Button>
		<Drawer v-model="show" :width="(data.length>0?980:260)" :draggable="true" :title="$t('review') + $t('article_images')">
			<div class="scroll" v-if="data.length>0">
				<template v-for="(item, index) in data">
					<div class="item" :key="index">
						<img :src="$assets.url+item.link" :alt="$assets.url" />
						<div class="delete">
							<Button type="error" @click="handleRemove(item,index)">{{$t('btn_delete')}}</Button>
						</div>
					</div>
				</template>
			</div>
			<div v-else>{{$t('temporarily_no_data')}}</div>
		</Drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				waterfall: {
					gap: 0,
					align: 'center',
					items: []
				},
			};
		},
		props: {
			data: {
				type: Array,
				default: () => {}
			}
		},
		methods: {
			handleRemove(file, index) {
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteArticleImageAssets', {
							path: file.link,
							uniqid: file.uniqid
						}).then(() => {
							that.data.splice(index, 1);
						});
					}
				});
				
			}
		}
	};
</script>

<style lang="less">
	.scroll{
		img{
			width: 100%;
		}
		.item {
			width:300px;
			height:200px;
			position:relative;
			float:left;
			margin:5px;
		
			img {
				width: 100%;
				height: 100%;
			}
		
			.delete {
				position: absolute;
				left: 0px;
				top: 0px;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, .5);
		
				.ivu-btn {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
</style>
