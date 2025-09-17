import { defineStore } from 'pinia'  // 从 pinia 导入 defineStore

// 定义并导出 useGlobalStore
export const useGlobalStore = defineStore('global', {
  state: () => ({
    userId: null,  
    userType: null  
  }),
  actions: {
    changeUserId(id) {
      this.userId = id
    },
    changeUserType(type) {
      this.userType = type
    },
    logout() {
      this.userId = null
      this.userType = null
    }
  }
  
})