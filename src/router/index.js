import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Logout from '../views/auth/Logout.vue'
import Register from '../views/auth/Register.vue'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'
import CodeEdit from '../views/CodeEdit.vue'
import VAuth from '../components/VAuth.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        name: 'auth',
        component: VAuth,
    },
    {
        path: '/code',
        name: 'code',
        component: Code,
        meta: { requiresAuth: true }
    },
    {
        path: '/code/:id',
        name: 'editcode',
        component: CodeEdit,
        meta: { requiresAuth: true },
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
        meta: { requiresVisitor: true }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresVisitor: true }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: { requiresAuth: true }
    }
]

const router = new VueRouter({ mode: 'hash', routes, base: '/code-highlighter/' })

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.user.id && !store.state.user.name) {
            next({
                name: 'login'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.state.user.id && store.state.user.name) {
            next({
                name: 'home'
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router