import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Row, Col, Tabs, Slider} from 'ant-design-vue'
import axios from 'axios'

console.log(process.env.VUE_APP_SERVICE)
console.log(process.env.VUE_APP_Authorization)

// axios.defaults.baseURL = process.env.VUE_APP_SERVICE
// axios.defaults.headers['Authorization'] = process.env.VUE_APP_Authorization

// 拦截请求
axios.interceptors.request.use((config) => {
    const getTokenUrl = process.env.VUE_APP_HB_SERVICE + process.env.VUE_APP_SERVICE_TOKEN_API
    if(config.url === getTokenUrl){
        return config
    }
    if(!window.localStorage.getItem('HB_SERVICE_API_TOKEN')){
        getToken()
    }
    let expireTime = parseInt(window.localStorage.getItem('HB_SERVICE_API_EXPIRETIME'))
    let now = new Date().getTime()
    // 让token早10秒种过期
    if (now - expireTime >= -10) {
        window.localStorage.removeItem('HB_SERVICE_API_TOKEN')
        window.localStorage.removeItem('HB_SERVICE_API_EXPIRETIME')
        getToken()
        // location.reload()
    }
    // 有 token就带上
    if (window.localStorage.getItem('HB_SERVICE_API_TOKEN')) {
        config.headers.Authorization = window.localStorage.getItem('HB_SERVICE_API_TOKEN')
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
Vue.prototype.$axios = axios
// Vue.prototype.$axios.defaults.baseURL = process.env.VUE_APP_HB_SERVICE

Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(Slider.name, Slider)
Vue.config.productionTip = false

function getToken() {
    Vue.prototype.$axios.post(process.env.VUE_APP_HB_SERVICE + process.env.VUE_APP_SERVICE_TOKEN_API, {
        username: 'tokentest',
        password: '123456'
    }).then( res => {
        console.log(res.data)
        window.localStorage.setItem('HB_SERVICE_API_TOKEN','Bearer '+ res.data.data.token)
        window.localStorage.setItem('HB_SERVICE_API_EXPIRETIME', res.data.data.expireAt)
    })
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
