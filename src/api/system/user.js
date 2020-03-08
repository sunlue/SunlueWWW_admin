import request from '@/utils/request'

const User = function() {}

User.prototype.create = function(data) {
	return request({
		url: 'system/user/create',
		method: 'post',
		data: data
	})
}

User.prototype.delete = function(data) {
	return request({
		url: 'system/user/delete',
		method: 'delete',
		data: data
	})
}

User.prototype.update = function(data) {
	return request({
		url: 'system/user/update',
		method: 'put',
		data: data
	})
}

User.prototype.read = function(data) {
	return request({
		url: 'system/user/read',
		method: 'get',
		params: data
	})
}

User.prototype.reset = function(data) {
	return request({
		url: 'system/user/reset',
		method: 'put',
		data: data
	})
}

User.prototype.auth = function(data) {
	return request({
		url: 'system/user/auth',
		method: 'put',
		data: data
	})
}

User.prototype.deleteAuth = function(data) {
	return request({
		url: 'system/user/delete_auth',
		method: 'delete',
		data: data
	})
}

export default new User();
