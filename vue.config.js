module.exports = {
	devServer: {
		proxy: 'http://api.sunlue.com/',
		overlay: {
			warnings: false,
			errors: false
		},
	},

	pages: {
		index: {
			entry: 'src/main.js',
			title: '四川上略互动网络技术有限公司',
		}
	},

	productionSourceMap: false,

	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.mode = 'production'
		} else {
			// 为开发环境修改配置...
			config.mode = 'development'
		}
	},

	lintOnSave: false
}
