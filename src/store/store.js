import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

// modules
import auth from './modules/auth';
import eais from './modules/eais';
// import chat from './modules/chat';
import settings from './modules/settings';
// import ecommerce from './modules/ecommerce';
// import mail from './modules/mail';
import sidebar from './modules/sidebar';
import extranotes from './modules/extranotes'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        eais,
        // chat,
        settings,
        // ecommerce,
        // mail,
        sidebar,
        extranotes
    }
})
