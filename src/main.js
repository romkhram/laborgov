import Vue from 'vue'
import Vuetify from 'vuetify'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueResource from 'vue-resource'
import miniToastr from 'mini-toastr'
import VModal from 'vue-js-modal'
import Nprogress from 'nprogress'
import InstantSearch from 'vue-instantsearch'


// global components
import GlobalComponents from './globalComponents'
// app.vue
import App from './App'
// router
import router from './router'
// themes
import primaryTheme from './themes/primaryTheme';
// store
import { store } from './store/store';

// include script file
import './lib/EaisScript'

// include all css files
import './lib/EaisCss'

// messages
import messages from './lang';

// navigation guards before each
router.beforeEach((to, from, next) => {
	Nprogress.start()
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (store.state.auth.tokenParams.access_token === null) {
			next({
				path: '/session/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})

// Отключение комментариев в консоли
// console.log = function() {};

// navigation guard after each
router.afterEach((to, from) => {
		Nprogress.done();

	setTimeout(() => {
		const contentWrapper = document.querySelector(".v-content__wrap");
		if(contentWrapper !== null){
			contentWrapper.scrollTop = 0;
		}
		const boxedLayout = document.querySelector('.app-boxed-layout .app-content');
		if(boxedLayout !==  null){
			boxedLayout.scrollTop = 0;
		}
		const miniLayout = document.querySelector('.app-mini-layout .app-content');
		if(miniLayout !== null){
			miniLayout.scrollTop = 0;
		}
	}, 200);
})

function toast({ title, message, type, timeout, cb }) {
	return miniToastr[type](message, title, timeout, cb)
}

const options = {
	success: toast,
	error: toast,
	info: toast,
	warn: toast
}

const toastTypes = {
	success: 'success',
	error: 'error',
	info: 'info',
	warn: 'warn'
}

miniToastr.init({ types: toastTypes })

// plugins
Vue.use(Vuetify, {
	theme: store.getters.selectedTheme.theme
});
Vue.use(InstantSearch);
Vue.use(VModal)
Vue.use(VueResource)
Vue.use(VueBreadcrumbs)
Vue.use(GlobalComponents)
Vue.mixin({
  methods: {
		forTime(val) {
      if (val && val !== null) {
        var without = val.split('T')[0];
  			var partDate = without.split('-');
  			return partDate[2] + '.' + partDate[1] + '.' + partDate[0];
      }
		},
	}
})

new Vue({
	store,
	router,
	render: h => h(App),
	components: { App }
}).$mount('#app')
