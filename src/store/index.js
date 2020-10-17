import Vue from 'vue'
import Vuex from 'vuex'

import code from './modules/code'
import user from './modules/user'
import Progress from './modules/progress'
import Notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        code,
        user,
        Progress,
        Notification
    }
})

export default store