import request from '@/utils/request'

const Init = function() {}

Init.prototype.init = function(data) {
	return request({
		url: 'system/init',
		method: 'get',
		params: data
	})
}
export default new Init();
