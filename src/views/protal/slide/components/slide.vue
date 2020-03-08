<template>
	<div tag="portal_slide_data" ref="portal_slide_data">
		<Tabs value="carousel">
			<TabPane label="幻灯片" name="carousel">
				<template v-if="items.length>0">
					<div class="scroll">
						<div class="carousel">
							<Carousel :autoplay="carousel.setting.autoplay" :autoplay-speed="carousel.setting.autoplaySpeed" :dots="carousel.setting.dots"
							 :radius-dot="carousel.setting.radiusDot" :trigger="carousel.setting.trigger" :arrow="carousel.setting.arrow">
								<CarouselItem v-for="(item,index) in items" :key="index">
									<div class="carousel-item">
										<img :src="item.src" :alt="item.data.name" />
									</div>
								</CarouselItem>
							</Carousel>
							<Divider />
							<Card>
								<Form :model="carousel.setting" :label-width="100">
									<FormItem label="自动切换">
										<i-switch v-model="carousel.setting.autoplay">
											<span slot="open">开</span>
											<span slot="close">关</span>
										</i-switch>
									</FormItem>
									<FormItem label="圆形指示器">
										<i-switch v-model="carousel.setting.radiusDot">
											<span slot="open">开</span>
											<span slot="close">关</span>
										</i-switch>
									</FormItem>
									<FormItem label="自动切换速度">
										<Slider v-model="carousel.setting.autoplaySpeed" :min="300" :max="10000" :step="100"></Slider>
									</FormItem>
									<FormItem label="指示器位置">
										<RadioGroup v-model="carousel.setting.dots" type="button">
											<Radio label="inside">内部</Radio>
											<Radio label="outside">外部</Radio>
											<Radio label="none">不显示</Radio>
										</RadioGroup>
									</FormItem>
									<FormItem label="切换箭头">
										<RadioGroup v-model="carousel.setting.arrow" type="button">
											<Radio label="hover">悬停时显示</Radio>
											<Radio label="always">一直显示</Radio>
											<Radio label="never">不显示</Radio>
										</RadioGroup>
									</FormItem>
									<FormItem label="指示器触发方式">
										<RadioGroup v-model="carousel.setting.trigger" type="button">
											<Radio label="click">点击</Radio>
											<Radio label="hover">悬停</Radio>
										</RadioGroup>
									</FormItem>
								</Form>
							</Card>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="empty">暂无数据</div>
				</template>
			</TabPane>
			<TabPane label="瀑布流" name="waterfall">
				<template v-if="items.length>0">
					<div class="scroll">
						<div ref="waterfall">
							<waterfall :line-gap="waterfall.gap" :watch="items" :align="waterfall.align">
								<waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index"
								 :key="item.id">
									<div class="item">
										<img :src="item.src" :alt="item.data.alt" />
										<div class="delete">
											<ButtonGroup>
												<Button type="info" @click="viewSlide(item,index)">查看</Button>
												<Button type="error" @click="deleteSlide(item,index)">删除</Button>
											</ButtonGroup>
										</div>
									</div>
								</waterfall-slot>
							</waterfall>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="empty">暂无数据</div>
				</template>
			</TabPane>
		</Tabs>
		<Drawer :title="$t('review')+$t('slide')" v-model="drawer" :width="800">
			<CellGroup v-if="item">
				<Cell :title="$t('slide')+$t('slide_name')" :extra="item.data.name" />
				<Cell :title="$t('slide_link')" :extra="item.data.link" />
				<Cell :title="$t('slide_sign')" :extra="item.data.sign" />
				<Cell :title="$t('slide_remark')" :extra="item.data.remark" />
			</CellGroup>
			<Divider />
			<img :src="item.src" style="margin: 20px auto;display: block;max-width: 100%;" />
		</Drawer>
	</div>
</template>
<script>
	import Waterfall from 'vue-waterfall/lib/waterfall'
	import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
	export default {
		components: {
			Waterfall,
			WaterfallSlot
		},
		data() {
			return {
				review: 'carousel',
				items: {},
				carousel: {
					setting: {
						autoplay: true,
						autoplaySpeed: 3000,
						dots: 'inside',
						radiusDot: false,
						trigger: 'click',
						arrow: 'hover'
					},
				},
				waterfall: {
					gap: 0,
					align: 'center'
				},
				search: {
					nav: ''
				},
				drawer: false,
				item: {
					data: {
						name: '',
						link: '',
						sign: '',
						remark: ''
					}
				}
			}
		},
		mounted() {
			let that = this;
			this.loadSlide({}, function() {
				that.$nextTick(function() {
					let maxWidth = that.$refs.portal_slide_data.offsetWidth;
					let gap = maxWidth / 4 - 5;
					that.waterfall.gap = gap;
				})
			})
		},
		methods: {
			getImgInfo(url, callback) {
				var img = new Image();
				img.src = url;
				img.onload = function() {
					callback(img.width, img.height);
				}
			},
			searchSlide(data) {
				this.loadSlide({
					nav: data.uniqid
				}, function() {

				})
			},
			loadSlide(where, callback) {
				var that = this,
					items = [],
					assetsUrl = that.$assets.url;
				that.$store.dispatch('readSlide', where).then((data) => {
					for (let i = 0; i < data.length; i++) {
						let imageSrc = assetsUrl + data[i]['image'];
						that.getImgInfo(imageSrc, function(width, height) {
							items.push({
								width: width,
								height: height,
								src: imageSrc,
								data: data[i]
							})
						})
					}
					that.items = items;
					callback();
				});
			},
			viewSlide(item, index) {
				this.item = item;
				this.drawer = true;
			},
			appendSlide(data){
				var that = this,
					assetsUrl = that.$assets.url,
					imageSrc = assetsUrl + data['image'];
				that.getImgInfo(imageSrc, function(width, height) {
					let items={
						width: width,
						height: height,
						src: imageSrc,
						data: data
					}
					that.items.push(items);
				})
			},
			deleteSlide(item, index) {
				let that = this;
				this.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteSlide', {
							uniqid: item.data.uniqid
						}).then(() => {
							that.items.splice(index, 1);
						});
					}
				});
			}
		}
	}
</script>
<style lang="less">
	div[tag="portal_slide_data"] {
		width: 100%;
		height: 100%;
		overflow: hidden;
		
		.ivu-tabs{
			height: 100%;
			.ivu-tabs-content{
				height: calc(100% - 52px);
				.empty{
					text-align: center;
					padding: 30px 0px;
				}
			}
		}
		.carousel{
			.ivu-card{
				margin-bottom: 10px;
			}
		}
		
		.item {
			position: absolute;
			top: 5px;
			left: 5px;
			right: 5px;
			bottom: 5px;
			font-size: 1.2em;
			color: rgb(0, 158, 107);

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

				.ivu-btn-group {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}

		.carousel {
			padding:0px 10px;
			.carousel-item {
				background: red;
				width: 100%;
				height: 460px;
				img{
					width: 100%;
					height: 460px;
				}
			}
		}
	}
</style>