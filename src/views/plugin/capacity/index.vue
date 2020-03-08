<template>
	<div tag="plugin_capacity">
		<full-calendar ref="calendar" :config="calendarSetting.config" :events="calendarSetting.events" />
		<Modal v-model="calendarModal.show" :title="calendarModal.title">
			<Form ref="calendarForm" label-position="top" :model="calendarForm">
				<FormItem label="单日游客最大接待量" class="plugin_capacity_formitem">
					<InputNumber v-model='calendarForm.number' />
					<span>人</span>
				</FormItem>
			</Form>
			<p slot="footer">
				<Button type="info" @click="handModalOk">确定</Button>
			</p>
		</Modal>
	</div>
</template>

<script>
	import {
		FullCalendar
	} from 'vue-full-calendar'
	import 'fullcalendar/dist/fullcalendar.css'
	import 'fullcalendar/dist/locale/zh-cn'
	export default {
		components: {
			FullCalendar
		},
		data() {
			let that = this;
			return {
				calendarSetting: {
					date: {
						start: '',
						end: ''
					},
					config: {
						defaultView: 'month',
						header: {
							left: 'prev,next today',
							center: 'title',
							right: 'month,listMonth'
						},
						aspectRatio: 1.8,
						locale: 'zh-cn',
						buttonText: {
							prev: '上月',
							next: '下月',
							month: '月',
							listMonth: '列表'
						},
						visibleRange: function(currentDate) {
							return {
								start: currentDate.clone().subtract(1, 'days'),
								end: currentDate.clone().add(3, 'days') // exclusive end, so 3
							};
						},
						eventClick: function(event) {
							that.clickCalendarDay(event)
						}
					},
					events: function(start, end, time, callback) {
						var capacity=new Object();
						var events = new Array();
						var sdate = new Date(start.format().replace(/-/g, "/"));
						var edate = new Date(end.format().replace(/-/g, "/"));
						var day = parseInt(edate.getTime() - sdate.getTime()) / (1000 * 60 * 60 * 24);
						that.$store.dispatch('readCapacity',{
							start:start.format(),
							end:end.format()
						}).then((result)=>{
							result.find((item)=>{
								capacity[item['date']]=item.number;
							})
							for (var i = 0; i < day; i++) {
								var dateTime = sdate.getTime() + 24 * 60 * 60 * 1000 * i;
								var date = new Date(dateTime);
								var y = date.getFullYear();
								var m = date.getMonth() + 1;
								var d = date.getDate();
								var start = y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d
								var number=capacity[start]?capacity[start]:0
								events.push({
									number:number,
									title: '最大接待量：'+number,
									start: start,
									allDay: true,
									className: 'calendar_events',
									color: '#515a6e',
									textColor: '#fff'
								});
							}
							callback(events)
						})
					}
				},
				calendarModal: {
					show: false,
					title: ''
				},
				calendarForm: {
					date:'',
					number: 0
				}
			}
		},
		methods: {
			clickCalendarDay(event) {
				var date=event.start.format();
				var dateFormat = date.split('-');
				var year = dateFormat[0];
				var month = dateFormat[1];
				var day = dateFormat[2];
				this.calendarModal.show = true;
				this.calendarModal.title = year + '年' + month + '月' + day + '日';
				this.calendarForm.date = date;
				this.calendarForm.number = event.number;
			},
			handModalOk() {
				this.$store.dispatch('submitCapacity',this.calendarForm).then(()=>{
					this.$refs.calendar.fireMethod('refetchEvents');
					this.$Message.success('success')
					this.calendarModal.show = false;
				})
			}
		},
	}
</script>

<style lang="less">
	.plugin_capacity_formitem {
		.ivu-input-number {
			width: calc(100% - 20px);
		}

		span {
			width: 20px;
			display: inline-block;
			text-align: center;
		}
	}
	div[tag="plugin_capacity"]{
		.calendar_events{
			text-align: center;
			padding: 10px 0px;
			margin-bottom: 15px;
			height: 100%;
		}
	}
</style>
