import Vue from 'vue'
import App from './App'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'
import Alertifyjs from 'vue2-alertifyjs'

const opts = {
	notifier:{
		delay:5,
		position:'top-right',
		closeButton: false
	},
	glossary:{
		title:'Уведомление',
		ok: 'OK',
		cancel: 'Cancel'           
	}
}

Vue.use(Alertifyjs,opts)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
})
