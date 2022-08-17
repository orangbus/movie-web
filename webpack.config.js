module.exports = {
	// 跨域请求设置
	dev: {
		proxyTable: {
			'/api': {
				target: "http://deepin.test",
				secure: false,  // 如果是https接口，需要配置这个参数
				changeOrigin: true, //是否跨域
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
	},

	// devServer: {
	// proxy: {
	// 	"/api": {
	// 		target: "http://deepin.test",
	// 		changeOrigin: true,
	// 		secure: false,
	// 		pathRewrite: {
	// 			'^/api': ''
	// 		}
	// 	}
	// },
	// },
	module: {
		rules: [
			{
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						// Requires sass-loader@^7.0.0
						options: {
							implementation: require('sass'),
							indentedSyntax: true // optional
						},
						// Requires >= sass-loader@^8.0.0
						options: {
							implementation: require('sass'),
							sassOptions: {
								indentedSyntax: true // optional
							},
						},
					},
				],
			},
		],
	}
}
