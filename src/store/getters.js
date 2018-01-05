// getters 从state中派生其他状态，应用于更新过滤数据，用于计算属性computed，主要针对动态数据
const getters = {
  lists: state => state.lists,
  total: state => state.total,
  detail: state => state.detail
}

export default getters
