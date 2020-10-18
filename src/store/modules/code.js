import { BASE_API_URL } from '../../constant'
import axios from 'axios'
import { stringifyUrl } from 'query-string'
import clean from 'lodash-clean'
import toast from 'cxlt-vue2-toastr'

axios.defaults.baseURL = BASE_API_URL;

const code = {
    namespaced: true,
    state: () => ({
        codes: [],
        isLoading: false,
        progress: false,
        languages: [],
        twoslashes: ['twoslash', 'tsconfig']
    }),
    getters: {

    },
    mutations: {
        addCodes(state, codes) {
            state.codes = codes
        },
        clearCodes(state) {
            state.codes = []
        },
        deleteCode(state, id) {
            const index = state.codes.findIndex(code => code.id == id)
            console.log(index)
            if (index >= 0) {
                state.codes.splice(index, 1)
            }
        },
        addLanguages(state, data) {
            state.languages = data
        }
    },
    actions: {
        getList(ctx, { userId, filter }) {
            ctx.commit('clearCodes')
            ctx.state.isLoading = true
            const { page, limit, sortBy, sort, highlighted } = filter
            const urlObject = {
                url: '/code/list',
                query: clean({
                    page: page,
                    limit: limit,
                    sortBy: sortBy,
                    sort: sort,
                    highlighted: highlighted
                })
            }

            /**
             * convert object to url params
             * @see https://www.npmjs.com/package/query-string
             */
            const url = stringifyUrl(urlObject, true)
            axios.post(url, { user: userId })
                .then(response => {
                    ctx.state.isLoading = false
                    const responseData = response.data
                    if (responseData.success && !responseData.error) {
                        ctx.commit('addCodes', responseData.data)
                    }
                }).catch(error => {
                    ctx.state.isLoading = false
                    console.log(error)
                })

        },
        getSingle(ctx, { userId, codeId, highlighted }) {
            return new Promise((resolve, reject) => {
                axios.post(`/code/single?highlighted=${highlighted}`, { user: userId, id: codeId })
                    .then(response => {
                        const responseData = response.data
                        if (responseData.success && !responseData.error) {
                            resolve(responseData.data)
                        }
                        reject(responseData.message)
                    }).catch(error => reject(error))
            })
        },
        getImage(ctx, data) {
            return new Promise((resolve, reject) => {
                const objekUrl = {
                    url: BASE_API_URL,
                    query: clean({
                        lang: data.lang,
                        fileName: data.fileName,
                        highlight: data.highlight,
                        twoslash: data.twoslash,
                        download: data.download,
                    }),
                };

                const url = stringifyUrl(objekUrl, true);
                axios({
                    url: url,
                    method: "POST",
                    responseType: "blob",
                    data: {
                        code: data.code,
                    },
                }).then(response => {
                    if (response.data) {
                        resolve(response.data)
                    }
                    reject(response)
                }).catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        store(ctx, { userId, dataCode }) {
            const { code, lang, highlight, fileName, twoslash } = dataCode
            const data = {
                user: userId,
                content: clean({
                    code: code,
                    lang: lang,
                    highlight: highlight,
                    fileName: fileName,
                    twoslash: twoslash
                })
            }
            return new Promise((resolve, reject) => {
                axios.post('/code/store', data)
                    .then(response => {
                        const responseData = response.data
                        if (responseData.success && !responseData.error) {
                            resolve(responseData.data)
                        }
                        reject(responseData.message)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        update(ctx, data) {
            const { userId, codeId, fileName, lang, highlight, code } = data;
            return new Promise((resolve, reject) => {
                axios.post('/code/edit',
                    clean({
                        id: codeId,
                        user: userId,
                        content: {
                            fileName: fileName,
                            highlight: highlight,
                            lang: lang,
                            code: code,
                        }

                    })
                ).then(response => {
                    const responseData = response.data;
                    if (responseData.success && !responseData.error) {
                        resolve(responseData)
                    }
                    reject(responseData.message)
                }).catch(error => reject(error))
            })
        },
        delete(ctx, data) {
            return new Promise((resolve, reject) => {
                axios.post('/code/delete', {
                    id: data.codeId,
                    user: data.userId
                }).then(response => {
                    const responseData = response.data
                    if (responseData.success && !responseData.error) {
                        console.log(data.codeId)
                        ctx.commit('deleteCode', data.codeId)
                        resolve('Code deleted successfully')
                    }
                    reject(responseData.message)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getLanguages(ctx) {
            axios.get("/options")
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.success && !responseData.error) {
                        ctx.commit('addLanguages', responseData.data.languages)
                    }
                })
                .catch((error) => {
                    toast.error({
                        title: "Failed to get languages list",
                        message: error,
                    });
                    console.log(error)
                });
        }

    }
}

export default code