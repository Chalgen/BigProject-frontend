import { defineStore } from 'pinia'  // 从 pinia 导入 defineStore

// 定义并导出 useGlobalStore
export const useGlobalStore = defineStore('global', {
  state: () => {
    const savedUserInfo = localStorage.getItem('userInfo');
    const parsedInfo = savedUserInfo ? JSON.parse(savedUserInfo) : {};

    return {
      userId: parsedInfo.userId || null,
      userType: parsedInfo.userType || null,
      nickname: parsedInfo.nickname || null,
      profilePhotoUrl: parsedInfo.profilePhotoUrl || null,
      token: parsedInfo.token || null,
      email: parsedInfo.email || null,
      userPhone: parsedInfo.userPhone || null,
    }
  },
  actions: {
    changeUserId(id) {
      this.userId = id
    },
    changeUserType(type) {
      this.userType = type
    },
    changeNickname(name) {
      this.nickname = name
    },
    changeProfilePhotoUrl(url) {
      this.profilePhotoUrl = url
    },
    changeEmail(address) {
      this.email = address
    },
    changeUserPhone(number) {
      this.userPhone = number
    },
    GetToken(token) {
      this.token = token
    },
    logout() {
      this.userId = null
      this.userType = null
      this.nickname = null
      this.profilePhotoUrl = null
      this.token = null;
      this.email = null;
      this.userPhone = null;
      localStorage.removeItem('userInfo');
    }
  }

})