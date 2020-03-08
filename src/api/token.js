import axios from 'axios'
import config from '@/config'
import request from '@/utils/request'

const Token = function() {}
Token.prototype.get = function(params) {
	return request({
		url: 'access_token',
		method: 'get',
		params: params
	})
}
Token.prototype.refresh = function(access_token) {
	return new Promise((resolve, reject) => {
		axios({
			url: 'refresh_token',
			async:false,
			baseURL: config.api.url(process.env.NODE_ENV),
			params: {
				access_token:access_token
			}
		}).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}
export default new Token();
