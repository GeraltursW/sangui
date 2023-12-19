import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
    name: '张三',
    }
    },
  actions: {
    updateName(names:string) {
    this.name = names
    },
    setUserInfo(){
      localStorage.setItem("token","12312312313123123")
    },
    getToken(){
      return localStorage.getItem("token")
    },
  }
})