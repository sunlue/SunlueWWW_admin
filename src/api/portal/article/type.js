import request from '@/utils/request'
const ArticleType = function() {}
ArticleType.prototype.create = function(data) {
	return request({
		url: 'portal/article/type/create',
		method: 'post',
		data: data
	})
}

ArticleType.prototype.delete = function(data) {
	return request({
		url: 'portal/article/type/delete',
		method: 'delete',
		data: data
	})
}
ArticleType.prototype.update = function(data) {
	return request({
		url: 'portal/article/type/update',
		method: 'put',
		data: data
	})
}
ArticleType.prototype.read = function(data) {
	return request({
		url: 'portal/article/type/read',
		method: 'get',
		params: data
	})
}
export default new ArticleType();
