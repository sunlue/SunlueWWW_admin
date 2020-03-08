import request from '@/utils/request'

const Capacity = function() {}

Capacity.prototype.submit = function(data) {
	return request({
		url: 'plugin/capacity/submit',
		method: 'post',
		data: data
	})
}

Capacity.prototype.read = function(data) {
	return request({
		url: 'plugin/capacity/read',
		method: 'get',
		params: data
	})
}

export default new Capacity();
