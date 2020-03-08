<template>
	<div tag="leave-message" class="page">
		<div class="split">
			<Split v-model="split.left">
				<div slot="left" class="split-pane left">
					<div class="scroll">
						<template v-for="(msg,group,index) in data">
							<div :class="['msg',index==activeMsgIndex?'active':'']" :key="index" @click="review(msg,index)">
								<h3>留言/咨询编号:{{group}}</h3>
								<p>{{msg.last.content}}</p>
							</div>
						</template>
						<template v-if="data.length<1">
							<div class="text-center" style="line-height: 100px;">
								暂无留言/咨询
							</div>
						</template>
					</div>
				</div>
				<div slot="right" class="split-pane right">
					<div class="msg">
						<div class="dialog">
							<template v-for="(data,i) in activeData">
								<div :class="['content',data.reply==true || data.reply=='true'?'reply':'']" :key="i">
									<span>{{data.by_time}}<br />{{data.content}}</span>
								</div>
							</template>
						</div>
						<div class="reply-input text-right">
							<Input type="textarea" :rows="4" v-model="content"></Input>
							<Button type="success" @click="reply">发送</Button>
						</div>
					</div>
					<div class="info">
						<Card title="留言/咨询人信息" icon="ios-options" :padding="0" :bordered="false" :dis-hover="true">
							<CellGroup>
								<Cell title="咨询类型" :label="activeInfo.type" v-if="activeInfo.type" />
								<Cell title="联系人" :label="activeInfo.name" v-if="activeInfo.name" />
								<Cell title="手机号" :label="activeInfo.mobile_tel" v-if="activeInfo.mobile_tel" />
								<Cell title="联系邮箱" :label="activeInfo.email" v-if="activeInfo.email" />
								<Cell title="联系地址" :label="activeInfo.address" v-if="activeInfo.address" />
								<Cell title="留言时间" :label="activeInfo.by_time" v-if="activeInfo.by_time" />
								<Cell title="留言IP" :label="activeInfo.by_ip" v-if="activeInfo.by_ip" />
							</CellGroup>
						</Card>
					</div>
				</div>
			</Split>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				split: {
					left: '230'
				},
				data: [],
				activeMsg: [],
				activeMsgIndex: 0,
				activeData: [],
				activeInfo: [],
				content: ''
			}
		},
		mounted() {
			this.$store.dispatch('readMsg').then((data) => {
				this.data = data;
				let map = new Array();
				for (let i in data) {
					map.push(data[i]);
				}
				this.activeInfo = map[0]['list'][0];
				this.activeData = map[0]['list'];
				this.activeMsg = map[0];
			})
		},
		methods: {
			review(msg, index) {
				this.activeMsg = msg;
				this.activeMsgIndex = index;
				this.activeData = msg['list'];
				this.activeInfo = msg['list'][0];
			},
			reply() {
				if(this.content==''){
					this.$Message.error('请输入回复内容');
					return false;
				}
				let group = this.activeMsg.last.group;
				this.$store.dispatch('replyMsg', {
					group: group,
					content: this.content
				}).then((result) => {
					this.activeData.push(result)
					this.content = '';
				})
			}
		},
	}
</script>

<style lang="less">
	div[tag="leave-message"] {
		.split-pane.left {
			.scroll {
				div.msg {
					display: block;
					padding: 10px;
					cursor: pointer;

					&.active {
						background: #f0f0f0;
					}

					h3 {
						display: block;
						font-size: 16px;
						color: #333333;
					}

					p {
						height: 24px;
						line-height: 24px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #878787;
						width: 100%;
					}
				}
			}
		}

		.split-pane.right {
			background: #f9f9f9;

			.msg {
				width: calc(100% - 220px);
				height: 100%;

				.dialog {
					padding: 10px;
					height: calc(100% - 150px);
					width: 100%;
					overflow-y: auto;

					.content {
						margin-bottom: 10px;
						width: auto;

						span {
							display: inline-block;
							background: #FFFFFF;
							padding: 10px;
							border-radius: 10px;
							color: #333333;
						}

						&.reply {
							text-align: right;

							span {
								background: #00CD00;
								text-align: left;
								color: white;
							}
						}

						&:last-child {
							margin-bottom: 0px;
						}
					}
				}

				.reply-input {
					height: 150px;
					background: white;

					textarea {
						border: none;
						resize: none;
						padding: 6px;
						width: 100%;
						outline: none;
						box-shadow: none;
					}

					.ivu-btn {
						margin: 10px;
					}
				}
			}

			.info {
				width: 220px;
				position: absolute;
				right: 0px;
				top: 0px;
				background: white;
				height: 100%;

				.ivu-cell {
					white-space: normal;
				}
			}

		}

		.ivu-split-horizontal {
			.ivu-split-trigger-con {
				&+.right-pane {
					left: 236px !important;
				}
			}
		}
	}
</style>
