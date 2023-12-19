import { defineStore } from 'pinia'

export const allStore = defineStore({
  id: 'all', // id必填，且需要唯一
  state: () => {
    return {
      dialogVisible: false,
    }
    },
  actions: {
    updateName(d:boolean) {
    this.dialogVisible = d
    },
  }
})