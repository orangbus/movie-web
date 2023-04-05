const server_url = process.env.VUE_APP_SERVER_URL;

module.exports = {
	// 跨域请求设置
	devServer: {
		host: "0.0.0.0",
		port: 8080,
		proxy: {
			'/api': {
				target: server_url+"/api", // server_url = http://127.0.0.1
				secure: false,  // 如果是https接口，需要配置这个参数
				changeOrigin: true, //是否跨域
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			},
		},
	},
}
