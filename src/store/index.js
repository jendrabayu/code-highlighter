import Vue from 'vue'
import Vuex from 'vuex'

import code from './modules/code'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        code,
        user,
    }
})

export default store