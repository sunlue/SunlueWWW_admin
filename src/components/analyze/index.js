import '@/utils/echart'

import {referer,traffic} from "./access"
const method = {
	access: {
		muster: function(params) {
			return new Promise((resolve, reject) => {
				var dataColum = new Object();
				params.forEach((item) => {
					this[item.total](item.type).then(response => {
						dataColum[item['total']] = response;
					}).catch(error => {
						reject(error)
					})
				})
				resolve(dataColum);
			})
		},
		traffic:function(){
			return new Promise((resolve, reject) => {
				traffic.get().then(response => {
					resolve(response);
				}).catch(error => {
					reject(error)
				})
			})
		},
		referer: function(type) {
			return new Promise((resolve, reject) => {
				referer.get(type).then(response => {
					resolve(response);
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default method;
