//axios二次封装：请求与响应拦截器
import axios from 'axios'


//利用create方法
const request = axios.create({
  baseURL: '/api',

  //baseURL: "http://127.0.0.1:4523/m1/7120556-6843396-default"
})

export default request