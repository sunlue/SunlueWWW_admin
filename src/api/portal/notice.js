import request from '@/utils/request'
const Notice = function() {}
Notice.prototype.create = function(data) {
	return request({
		url: 'portal/notice/create',
		method: 'post',
		data: data
	})
}

Notice.prototype.delete = function(data) {
	return request({
		url: 'portal/notice/delete',
		method: 'delete',
		data: data
	})
}

Notice.prototype.update = function(data) {
	return request({
		url: 'portal/notice/update',
		method: 'put',
		data: data
	})
}

Notice.prototype.release = function(data) {
	return request({
		url: 'portal/notice/release',
		method: 'put',
		data: data
	})
}

Notice.prototype.read = function(data) {
	return request({
		url: 'portal/notice/read',
		method: 'get',
		params: data
	})
}
export default new Notice();
