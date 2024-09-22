import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ReqGetuserList } from '@/apis/user.js'
export const useListStore = defineStore('list', () => {
  const usersList = ref([])
  const total = ref(0)

  const getUserList = async (queryList) => {
    const res = await ReqGetuserList(queryList)
    usersList.value = res.data.data.list
    total.value = res.data.data.totalCount
    console.log('获取个人列表')
  }
  return { usersList, getUserList, total }
})
