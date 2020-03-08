import request from '@/utils/request'

const Link = function() {}


Link.prototype.create = function(data) {
	return request({
		url: 'basis/link/create',
		method: 'post',
		data: data
	})
}

Link.prototype.delete = function(data) {
	return request({
		url: 'basis/link/delete',
		method: 'delete',
		data: data
	})
}

Link.prototype.update = function(data) {
	return request({
		url: 'basis/link/update',
		method: 'put',
		data: data
	})
}
Link.prototype.read = function(data) {
	return request({
		url: 'basis/link/read',
		method: 'get',
		params: data
	})
}

export default new Link();
