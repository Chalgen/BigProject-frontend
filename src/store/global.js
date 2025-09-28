import { defineStore } from 'pinia'  // 从 pinia 导入 defineStore

// 定义并导出 useGlobalStore
export const useGlobalStore = defineStore('global', {
  state: () => ({
    userId: null,  
    userType: null,
    nickname: null,
    profilePhotoUrl: null,
  }),
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
    logout() {
      this.userId = null
      this.userType = null
      this.nickname = null
      this.profilePhotoUrl = null
    }
  }
  
})