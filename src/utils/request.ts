//axios二次封装：请求与响应拦截器
import axios from 'axios'


//利用create方法
const request = axios.create({
  //baseURL: "http://127.0.0.1:4523/m1/7131475-6854516-default"
  //baseURL: import.meta.env.VITE_API_BASE_URL,
  //timeout: 5000
  //baseURL: "http://127.0.0.1:8080"
  //baseURL: "http://127.0.0.1:4523/m1/7120556-6843396-default"
  //baseURL: "http://192.168.43.155:8080"
  baseURL: "http://192.168.137.191:8080"
})

export default request