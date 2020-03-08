import request from '@/utils/request'

const User = function() {}
User.prototype.login = function(userInfo) {
	return request({
		url: 'user/login',
		method: 'post',
		data: userInfo
	})
}
User.prototype.exit = function(data) {
	return request({
		url: 'user/exit',
		method: 'post',
		data: data
	})
}
User.prototype.updatePwd = function(data) {
	return request({
		url: 'user/updatePwd',
		method: 'put',
		data: data
	})
}
export default new User();
