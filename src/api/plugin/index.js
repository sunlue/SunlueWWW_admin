import request from '@/utils/request'

const Index = function() {}


Index.prototype.install = function(data) {
	return request({
		url: 'plugin/install',
		method: 'post',
		data: data
	})
}

Index.prototype.uninstall = function(data) {
	return request({
		url: 'plugin/uninstall',
		method: 'post',
		data: data
	})
}

Index.prototype.state = function(data) {
	return request({
		url: 'plugin/state',
		method: 'post',
		data: data
	})
}

Index.prototype.read = function(data) {
	return request({
		url: 'plugin/read',
		method: 'get',
		params: data
	})
}

export default new Index();
