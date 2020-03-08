import request from '@/utils/request'
const Message = function() {}
Message.prototype.create = function(data) {
	return request({
		url: 'portal/message/create',
		method: 'post',
		data: data
	})
}

Message.prototype.delete = function(data) {
	return request({
		url: 'portal/message/delete',
		method: 'delete',
		data: data
	})
}

Message.prototype.reply = function(data) {
	return request({
		url: 'portal/message/reply',
		method: 'put',
		data: data
	})
}

Message.prototype.read = function(data) {
	return request({
		url: 'portal/message/read',
		method: 'get',
		params: data
	})
}
export default new Message();
