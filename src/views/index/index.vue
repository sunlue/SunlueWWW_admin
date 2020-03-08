<template>
	<div tag="page_index" class="page">
		<div class="scroll-y">
			<Row :gutter="10">
				<Col span="16">
					<Card class="application col-item" v-if="false">
						<p slot="title">{{$t('plugin_manage')}}</p>
						<plugin></plugin>
					</Card>
					<Card class="access col-item">
						<p slot="title">{{$t('sebsite_visit')}}</p>
						<v-chart :options="echats.access.traffic" :autoresize="true" />
					</Card>
				</Col>
				<Col span="8">
					<Card class="access col-item">
						<p slot="title">{{$t('user_access_source')}}</p>
						<v-chart :options="echats.access.referer" :autoresize="true" />
					</Card>
					<!-- 我的信息 -->
					<Card class="my_info col-item">
						<p slot="title">{{$t('my_info')}}【{{userInfo.uniqid}}】</p>
						<CellGroup>
							<Cell :title="$t('user_account')" :extra="userInfo.account"  />
							<Cell :title="$t('user_name')" :extra="userInfo.name" v-if="userInfo.name"  />
							<Cell :title="$t('user_nickname')" :extra="userInfo.nickname" v-if="userInfo.nickname"  />
							<Cell :title="$t('user_login_time')" :extra="userInfo.login_time" v-if="userInfo.login_time" />
							<Cell :title="$t('user_login_count')" :extra="userInfo.login_count+'次'" v-if="userInfo.login_count"  />
							<Cell :title="$t('user_mobile_login')" :extra="userInfo.is_mobile=='yes'?$t('enable'):$t('disable')"  />
						</CellGroup>
					</Card>
					<!-- 站点信息 -->
					<Card class="site_info col-item">
						<p slot="title">{{$t('site_info')}}</p>
						<router-link :to="{name:'site_info'}" slot="extra">{{$t('update')}}</router-link>
						<CellGroup>
							<Cell :title="$t('seo_title')" :extra="siteInfo.seo_title" v-if="siteInfo.seo_title" />
							<Cell :title="$t('seo_keywords')" :extra="siteInfo.seo_keywords" v-if="siteInfo.seo_keywords" />
							<Cell :title="$t('seo_description')" :extra="siteInfo.seo_description" v-if="siteInfo.seo_description" />
							<Cell :title="$t('icp_copyright')" :extra="siteInfo.icp_copyright" v-if="siteInfo.icp_copyright" />
							<Cell :title="$t('police_copyright')" :extra="siteInfo.police_copyright" v-if="siteInfo.police_copyright" />
							<Cell :title="$t('master_email')" :extra="siteInfo.master_email" v-if="siteInfo.master_email" />
							<Cell :title="$t('site_state')" >
								<i-switch v-model="siteInfo.site_state" size="large" true-value="1" false-value="0" slot="extra" :disabled="true">
									<span slot="open">{{$t('open')}}</span>
									<span slot="close">{{$t('close')}}</span>
								</i-switch>
							</Cell>
							<Cell :title="$t('site_close_why')" :label="siteInfo.site_close_why"></Cell>
						</CellGroup>
					</Card>
					<!-- 关于我们 -->
					<Card class="about col-item">
						<p slot="title">关于我们</p>
						<a href="http://www.sunlue.com" slot="extra" target="_blank">
							{{$t('review')}}
						</a>
						<p style="text-indent: 2em;margin-bottom: 10px;">
							上略互动是一家坚持“应用创新”的艺术科技公司，多年来扎根中国文化旅游产业，以良好的专业素养和服务意识在行业中独树一帜，致力于成为中国文化旅游行业解决方案专业提供商。
						</p>
						<p style="text-indent: 2em;margin-bottom: 10px;">
							我们不仅仅是一家企业，更是创新思维方式的倡导者与执行者，我们努力将这种创新的思维模式延伸到商业领域，为推动中国文化旅游产业的发展做出积极贡献。
						</p>
					</Card>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	import analyze from '@/components/analyze'
	import plugin from './components/plugin/index'
	export default {
		name: 'index',
		components: {
			plugin
		},
		data() {
			let userInfo=this.$store.getters.userInfo;
			return {
				userInfo:userInfo,
				siteInfo:{},
				echats:{
					access:{
						referer:{},
						traffic:{}
					}
				}
			}
		},
		mounted() {
			this.$store.dispatch('readSite', {
				type: 'setting',
			}).then((result) => {
				this.siteInfo = result.content;
			})
			analyze.access.referer('pie').then((data)=>{
				this.echats.access.referer=data;
			})
			analyze.access.traffic().then((data)=>{
				this.echats.access.traffic=data;
			})
		}
	};
</script>

<style lang="less">
	div[tag="page_index"]{
		background: #F0F0F0;
		padding:10px 5px;
		.scroll-y{
			width: calc(100% - 10px);
			height: calc(100% - 20px);
			position: absolute;
			.ivu-row{
				height:100%;
				margin:0px !important;
				.ivu-col{
					.col-item{
						margin-bottom:10px;
					}
				}
			}
			.application{
				.item{
					.ivu-card-body{
						text-align: center;
					}
				}
			}
		}
		
		.echarts, .echarts>div:first-child, .echarts>div>canvas{
			width: 100% !important;
		}
	}
</style>
