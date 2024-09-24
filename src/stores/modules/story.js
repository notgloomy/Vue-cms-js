import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ReqGetStoryList } from '@/apis/story.js'

export const useStoryStore = defineStore('story', () => {
  const storyList = ref([])
  const storyCount = ref(-1)

  const getStoryList = async (formData) => {
    const res = await ReqGetStoryList(formData)
    storyList.value = res.data.data.list
    storyCount.value = res.data.data.totalCount
  }

  return { storyCount, storyList, getStoryList }
})
