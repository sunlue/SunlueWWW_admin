<template>
	<div class="thumbnail">
		<Tooltip :content="$t('tips_dblclick_delte')" placement="right">
			<img v-if="linkpath" @dblclick="deleteImage" :src="upload.path" />
		</Tooltip>
		<Upload  v-if="!linkpath" :action="upload.url" :show-upload-list="false"
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
			let uploadImage=this.$assets.upload.image;
			return {
				linkpath:'',
				upload:{
					url:uploadImage,
				},
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
		mounted(){
			let assetsUrl=this.$assets.url;
			this.linkpath=this.thumbnail;
			this.upload.path=assetsUrl+this.thumbnail;
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
				}
				this.$emit('uploadSuccess',response.data);
				this.linkpath=response.data.link;
				this.upload.path=response.data.url+response.data.link;
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
						that.$store.dispatch('updateArticlePage',{
							uniqid:uniqid,
							field:'thumbnail',
							value:''
						}).then((result) => {
							axios.delete(that.$assets.delete,{
								data:{path:that.linkpath}
							}).then(()=>{
								that.linkpath='';
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
