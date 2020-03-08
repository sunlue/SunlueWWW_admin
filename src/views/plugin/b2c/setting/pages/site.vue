<template>
	<Card>
		<Form ref="formCustom" :model="form.data" :rules="form.rules" :label-width="80">
			<FormItem label="Password" prop="passwd">
				<Input type="password" v-model="form.data.name"></Input>
			</FormItem>
			<FormItem label="Confirm" prop="passwdCheck">
				<Input type="password" v-model="form.data.name"></Input>
			</FormItem>
			<FormItem label="Age" prop="age">
				<Input type="text" v-model="form.data.name" number></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
				<Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
			</FormItem>
		</Form>
	</Card>
</template>

<script>
	export default{
		data() {
			return {
				form: {
					data:{
						name:''
					}
				},
				rules:{}
			}
		},
		methods: {
			handleSubmit() {
				
			},
			handleReset(){
				
			}
		},
	}
</script>

<style>
</style>
