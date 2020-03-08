import request from '@/utils/request'
const Slide = function() {}
Slide.prototype.create = function(data) {
	return request({
		url: 'portal/slide/create',
		method: 'post',
		data: data
	})
}

Slide.prototype.delete = function(data) {
	return request({
		url: 'portal/slide/delete',
		method: 'delete',
		data: data
	})
}

Slide.prototype.update = function(data) {
	return request({
		url: 'portal/slide/update',
		method: 'put',
		data: data
	})
}

Slide.prototype.read = function(data) {
	return request({
		url: 'portal/slide/read',
		method: 'get',
		params: data
	})
}
export default new Slide();
