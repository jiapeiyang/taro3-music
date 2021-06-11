import api from '../services/api'

export const getRecommendPlayListApi = async () => {
  let res = await api.get('/personalized')
  return res
}