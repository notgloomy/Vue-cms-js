import instance from '@/service/request'
// 与故事相关的接口
// 获取故事列表
export const ReqGetStoryList = (formData) => {
  return instance.post('/story/list', formData)
}

// 你的故事
export const ReqCreateStory = (formData) => {
  return instance.post('/story', formData)
}
