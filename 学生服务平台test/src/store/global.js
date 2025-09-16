import { defineStore } from 'pinia'  // 从 pinia 导入 defineStore

// 定义并导出 useGlobalStore
export const useGlobalStore = defineStore('global', {
  // 状态（类似组件的 data）
  state: () => ({
    user_id:null
  }),
  
  // 方法（类似组件的 methods，用于修改状态）
  actions: {
    changeuserid(id) {
      this.user_id = id//改了id，改了null
    },
  },
  
  
})