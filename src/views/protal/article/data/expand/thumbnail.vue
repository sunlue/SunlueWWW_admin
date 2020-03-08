<template>
	<div class="thumbnail">
		<Tooltip :content="$t('tips_dblclick_delte')" placement="right" v-if="thumbnail">
			<img @dblclick="deleteImage" :src="$assets.url+thumbnail" />
		</Tooltip>
		<Upload  v-else :action="$upload.image" :show-upload-list="false"
			:format="['png','jpg','jpeg','gif']" name="file" :on-success="uploadThumbSuccess"
			:on-error="uploadThumbError" :on-progress="uploadThumbProgress"
			:on-format-error="uploadThumbFormatError">
			<Button type="info" size="small">{{$t('upload')}}</Button>
		</Upload>
		<Modal v-model="slider.show" :closable="false" :footer-hide="true" :mask-closable="false">
			<Slider v-model="slider.value" :show-tip="slider.tip"></Slider>
		</Modal>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data() {
			return {
				slider:{
					show:false,
					value:0,
					tip:'never'
				}
			}
		},
		props: {
			data: {
				type: Object,
				default: ()=>{}
			},
			thumbnail:{
				type:String,
				default:''
			}
		},
		methods: {
			uploadThumbProgress(event ){
				this.slider.value=parseInt((event.loaded/event.total)*100);
				if (this.slider.value>0 && this.slider.value<100) {
					this.slider.tip='always';
					this.slider.show=true;
				} else{
					this.slider.tip='never';
					this.slider.show=false;
				}
			},
			uploadThumbSuccess(response){
				if(response.code!=200){
					this.$Message.error(response.info);
				}else{
					this.$emit('uploadSuccess',response.data);
					this.thumbnail=response.data.link;
					this.$Message.success('success');
				}
			},
			uploadThumbError(error){
				console.error(error)
			},
			uploadThumbFormatError(file){
				this.$Message.error('文件['+file.name+']格式错误');
			},
			deleteImage(){
				let that=this,
					uniqid=that.data.uniqid;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('updateArticleList',{
							uniqid:uniqid,
							field:'thumbnail',
							value:''
						}).then((result) => {
							axios.delete(this.$assets.delete,{
								data:{path:that.thumbnail}
							}).then(()=>{
								that.thumbnail='';
							})
						});
					}
				});
			}
		},
	}
</script>

<style lang="less">
	.thumbnail{
		.ivu-tooltip,.ivu-tooltip-rel,img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
