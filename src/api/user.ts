import { useGlobalStore } from '@/store/global';
import request from '../utils/request'

export interface LoginParams {
  username: string;
  password: string;
}

//通过interface接口形式保证params形参格式
export const loginApi = (params: LoginParams) => {
  return request({//axios.create特有的内部编辑打请求方式
    //使用在utils中定义的request函数，让loginapi函数直接返回request的返回值
    //axios.create的返回值是一种特殊的"promise"对象，专门处理异步, 可返回error被catch到

    "headers": {//通过headers请求头的方式告知服务器 返回数据 是 JSON形式
      "Content-Type": "application/json",
    },
    url: "/api/auth/login/student",
    //url: "/api/auth/login",

    //指定host之后的port
    //e.g. https://www.doubao.com/chat中
    //https是协议头Protocol; doubao.com是host域名
    method: "post",//等价于axios.post
    data: params,//把params形参打出去
  })
}

export const registerApi = (data: FormData) => {
  //const globalStore = useGlobalStore();
  //const token = globalStore.token;
  return request({
    "headers": {
      //"Authorization": 'Bearer ' + token,
      "Content-Type": "application/json",
    },
    url: "/api/auth/register",
    method: "post",
    data: data,
  })
}

export interface StudentGetPostParams {
  user_id: number;
  //tags:string[];
}



export interface PostMessage {
  title: string;
  content: string;
  tag: string;
  isUrgent: boolean;
  isAnonymity: boolean;
}


export const ChangeUserInfoApi = (id: string | number, data: FormData) => {
  const globalStore = useGlobalStore();
  const token = globalStore.token;
  return request({
    "headers": {
      "Authorization": 'Bearer ' + token,
    },
    url: `/api/user/${id}/profile`,
    method: "post",
    data: data,
  })
}
export const ChangeUserPasswordApi = (data: FormData) => {
  const globalStore = useGlobalStore();
  const token = globalStore.token;
  return request({
    "headers": {
      "Authorization": 'Bearer ' + token,
    },
    url: "/api/auth/reset-password",
    method: "post",
    data: data,
  })
}

export const ChangeProfilePhotoApi = (data: FormData) => {
  const globalStore = useGlobalStore();
  const token = globalStore.token;
  return request({
    "headers": {
      "Authorization": 'Bearer ' + token,
      "Content-Type": "multipart/form-data",
    },
    url: "/api/file/upload",
    method: "post",
    data: data,
  })
}
