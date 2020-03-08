import request from '@/utils/request'

const methods = function() {}

methods.prototype.read = function(data) {
	return request({
		url: 'region/read',
		method: 'get',
		params: data
	})
}
methods.prototype.child = function(data) {
	return request({
		url: 'region/child',
		method: 'get',
		params: data
	})
}
export default new methods();
