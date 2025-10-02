import request from '../utils/request'

// 登录接口
export const login = (data) => {
  // 仅使用相对路径，基础地址自动拼接
  return request.post('/login', data)
}