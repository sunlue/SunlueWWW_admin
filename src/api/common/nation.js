import request from '@/utils/request'

const methods = function() {}

methods.prototype.read = function(data) {
	return request({
		url: 'nation/read',
		method: 'get',
		params: data
	})
}
export default new methods();
