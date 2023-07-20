// 该服务为 vercel serve跨域处理
const {
	createProxyMiddleware
} = require('http-proxy-middleware')
module.exports = (req, res) => {
	let target = ''
	// 代理目标地址
	// xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
	if (req.url.startsWith('/')) { //这里使用/api可能会与vercel serverless 的 api 路径冲突，根据接口进行调整
		target = 'http://162.14.72.65:8090' //这里就是在vite中配置的一样
	}
	// 创建代理对象并转发请求
	createProxyMiddleware({
		target,
		changeOrigin: true,
		pathRewrite: {
			// 通过路径重写，去除请求路径中的 `/api`
			'^/': '/'
		}
	})(req, res)
}