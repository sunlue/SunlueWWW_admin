import request from '@/utils/request'

const Site = function() {}

Site.prototype.submit = function(data) {
	return request({
		url: 'basis/site/submit',
		method: 'post',
		data: data
	})
}

Site.prototype.read = function(data) {
	return request({
		url: 'basis/site/read',
		method: 'get',
		params: data
	})
}

export default new Site();
