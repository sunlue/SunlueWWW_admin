import axios from 'axios'
import config from '@/config'
import request from '@/utils/request'

const assets = function() {}
assets.prototype.delete = function(params) {
	return new Promise((resolve, reject) => {
		axios({
			async: false,
			data: params,
			method: 'delete',
			url: config.assets.delete,
		}).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}
assets.prototype.deleteArticleFile = function(data) {
	return request({
		url: 'portal/article/attach/file/delete',
		method: 'delete',
		data: data
	})
}
assets.prototype.deleteArticleImage = function(data) {
	return request({
		url: 'portal/article/attach/image/delete',
		method: 'delete',
		data: data
	})
}
export default new assets();
