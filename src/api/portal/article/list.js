import request from '@/utils/request'
const ArticleList = function() {}
ArticleList.prototype.create = function(data) {
	return request({
		url: 'portal/article/data/create',
		method: 'post',
		data: data
	})
}

ArticleList.prototype.delete = function(data) {
	return request({
		url: 'portal/article/data/delete',
		method: 'delete',
		data: data
	})
}
ArticleList.prototype.update = function(data) {
	return request({
		url: 'portal/article/data/update',
		method: 'put',
		data: data
	})
}
ArticleList.prototype.read = function(data) {
	return request({
		url: 'portal/article/data/read',
		method: 'get',
		params: data
	})
}
export default new ArticleList();
