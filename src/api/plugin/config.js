import request from '@/utils/request'

const Config = function() {}

Config.prototype.submit = function(data) {
	return request({
		url: 'plugin/config/submit',
		method: 'post',
		data: data
	})
}

Config.prototype.read = function(data) {
	return request({
		url: 'plugin/config/read',
		method: 'get',
		params: data
	})
}

Config.prototype.install = function(data) {
	return request({
		url: 'plugin/install',
		method: 'post',
		data: data
	})
}

export default new Config();
