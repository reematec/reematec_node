const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		main: {
			import: './public/js/script.js',
			// dependOn: 'shared',
		},
		// dep: {
		//   import: './public/js/dependency.mjs',  dependOn: 'shared',
		// },
		// shared: './public/js/dependency_main.mjs'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public/dist/js'),
	},
};