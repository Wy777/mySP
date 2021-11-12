import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

createApp(App).use(store).use(router).mount('#app')

// axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }).then(res => {
//   console.log(res)
// })

// axios({
//   url: 'http://123.207.32.32:8000/home/data'
// }).then(res => {
//   console.log(res)
// })

//以上两个axios请求都是全局进行的，用的axios也是全局的axios

// const instance1 = axios.create({
//   baseURL: 'http://152.136.185.210:7878/api/hy66'
// })
//
// instance1({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res.data.data)
// })
//
// export {instance1}

//老师这里提到一个概念，当项目里需要axios【别的框架同理】的时候，最坏的方式就是在每一个vue文件里去引入这个全局axios或者自己定义的实例axios，因为如果哪天axios不再维护了，我们需要更换新的网络请求框架，那么到时候更改的一个工程量，是非常吓人的，我们需要去每一个vue文件里修改代码，不仅量多，还可能会有遗漏。so，最好的是利用axios封装一个api，然后在每个vue文件里引入这个api就可以了，如果到时候要换新的网络请求框架，就只在封装的代码里去更改，vue文件还是照常运行