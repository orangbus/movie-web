const server_url = process.env.VUE_APP_SERVER_URL;

module.exports = {
	// 跨域请求设置
	devServer: {
		// proxy: {
		// 	'/merchant': {
		// 		target: server_url+"/merchant",
		// 		secure: false,  // 如果是https接口，需要配置这个参数
		// 		changeOrigin: true, //是否跨域
		// 		ws: true,
		// 		pathRewrite: {
		// 			'^/merchant': ''
		// 		}
		// 	}
		// },
		proxy: {
			'/api': {
				target: server_url+"/api",
				secure: false,  // 如果是https接口，需要配置这个参数
				changeOrigin: true, //是否跨域
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
	},
}
