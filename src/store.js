import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/app'

import * as module from '@/store/module'

const modules = Object.assign(module.default, {
	app: app
});

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: modules,
	getters: {
		menu: state => {
			return state.app.menu;
		}
	}
})
export default store;
