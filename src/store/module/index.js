function fileName(path) {
	let FileName = '';
	if (typeof path == 'object') {
		for (let i = 0; i < path.length; i++) {
			if (i == 0) {
				FileName = FileName + path[i]
			} else {
				let str = path[i];
				FileName = FileName + str.replace(str[0], str[0].toUpperCase())
			}
		}
	}
	return FileName;
}

const files = require.context('.', true, /\.js$/)
const modules = {}

files.keys().forEach(key => {
	if (key === './index.js') return
	let filePath = key.replace(/(\.\/|\.js)/g, '').split('/');
	modules[fileName(filePath)] = files(key).default
})

export default modules
