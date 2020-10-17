import { BASE_API_URL } from '../../constant'
import Cookies from 'js-cookie'
import axios from 'axios'

axios.defaults.baseURL = BASE_API_URL;

const user = {
    namespaced: true,
    state: () => ({
        id: Cookies.get('id') || null,
        name: Cookies.get('name') || null,
        progress: false
    }),
    getters: {

    },
    mutations: {
        addUser(state, { id, name }) {
            state.id = id
            state.name = name
        },
        deleteUser(state) {
            state.id = null
            state.name = null
        }
    },
    actions: {
        login(ctx, username) {
            ctx.state.progress = true
            return new Promise((resolve, reject) => {
                axios.post('/user/login', { name: username })
                    .then(response => {
                        const responseData = response.data
                        ctx.state.progress = false
                        if (responseData.success && !responseData.error) {
                            // store id and name to cookie
                            Cookies.set('id', responseData.data.id)
                            Cookies.set('name', responseData.data.name)
                            ctx.commit('addUser', responseData.data)
                            resolve(responseData.data)
                        }
                        reject(responseData.message)
                    }).catch(error => {
                        ctx.state.progress = false
                        reject(error)
                    })
            })
        },
        register(ctx, username) {
            ctx.state.progress = true
            return new Promise((resolve, reject) => {
                axios.post('/user/register', { name: username })
                    .then(response => {
                        const responseData = response.data
                        ctx.state.progress = false
                        if (responseData.success && !responseData.error) {
                            resolve(responseData.data)
                        }
                        reject(responseData.message)
                    }).catch(error => {
                        ctx.state.progress = false
                        reject(error)
                    })
            })
        },
        logout(ctx) {
            Cookies.remove('id')
            Cookies.remove('name')
            ctx.commit('deleteUser')
        }
    }
}

export default user