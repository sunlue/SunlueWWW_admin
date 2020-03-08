import request from '@/utils/request'
const ArticlePage = function() {}
ArticlePage.prototype.create = function(data) {
	return request({
		url: 'portal/article/page/create',
		method: 'post',
		data: data
	})
}

ArticlePage.prototype.delete = function(data) {
	return request({
		url: 'portal/article/page/delete',
		method: 'delete',
		data: data
	})
}
ArticlePage.prototype.update = function(data) {
	return request({
		url: 'portal/article/page/update',
		method: 'put',
		data: data
	})
}
ArticlePage.prototype.read = function(data) {
	return request({
		url: 'portal/article/page/read',
		method: 'get',
		params: data
	})
}
export default new ArticlePage();
