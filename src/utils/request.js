import axios from 'axios'

const request = axios.create({
  baseURL:"http://127.0.0.1:4523/m1/7131475-6854516-default"
  //baseURL: import.meta.env.VITE_API_BASE_URL,
  //timeout: 5000
})

export default request