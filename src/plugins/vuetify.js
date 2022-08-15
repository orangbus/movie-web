import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.use(Vuetify)

const opts = {
	// icons: {
	// 	iconfont: 'mdi', // 默认值 - 仅用于展示目的
	// },
}

export default new Vuetify(opts)
