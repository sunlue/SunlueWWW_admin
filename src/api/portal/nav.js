import request from '@/utils/request'
const Nav = function() {}
Nav.prototype.create = function(data) {
	return request({
		url: 'portal/nav/create',
		method: 'post',
		data: data
	})
}

Nav.prototype.delete = function(data) {
	return request({
		url: 'portal/nav/delete',
		method: 'delete',
		data: data
	})
}
Nav.prototype.update = function(data) {
	return request({
		url: 'portal/nav/update',
		method: 'put',
		data: data
	})
}
Nav.prototype.read = function(data) {
	return request({
		url: 'portal/nav/read',
		method: 'get',
		params: data
	})
}
export default new Nav();
