import request from '@/utils/request'

const Role = function() {}

Role.prototype.create = function(data) {
	return request({
		url: 'system/role/create',
		method: 'post',
		data: data
	})
}

Role.prototype.delete = function(data) {
	return request({
		url: 'system/role/delete',
		method: 'delete',
		data: data
	})
}

Role.prototype.update = function(data) {
	return request({
		url: 'system/role/update',
		method: 'put',
		data: data
	})
}

Role.prototype.rights = function(data) {
	return request({
		url: 'system/role/rights',
		method: 'put',
		data: data
	})
}


Role.prototype.read = function(data) {
	return request({
		url: 'system/role/read',
		method: 'get',
		params: data
	})
}

Role.prototype.userAuth = function(data) {
	return request({
		url: 'system/role/user_auth',
		method: 'PUT',
		data: data
	})
}

export default new Role();
