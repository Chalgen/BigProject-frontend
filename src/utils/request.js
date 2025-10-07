import axios from 'axios'

const request = axios.create({
  baseURL: "/api"
  //baseURL: "http://127.0.0.1:4523/m1/7120556-6843396-default"
  //baseURL: import.meta.env.VITE_API_BASE_URL,
  //timeout: 5000
})

export default request