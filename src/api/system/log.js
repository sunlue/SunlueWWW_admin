import request from '@/utils/request'

const Log = function() {}

Log.prototype.login = function(data) {
	return request({
		url: 'system/log/login',
		method: 'get',
		params: data
	})
}
export default new Log();
