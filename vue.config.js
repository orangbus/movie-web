module.exports = {
	// 跨域请求设置
	devServer: {
		proxy: {
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
}
