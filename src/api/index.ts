import api from '../services/api'

// 获取推荐歌单列表
export const getRecommendPlayListApi = async () => {
  const res = await api.get('/personalized')
  return res
}

// 获取歌单详情
export const getPlayListDetailApi = async (id) => {
  const res = await api.get('/playlist/detail', {
    id
  })
  return res
}
