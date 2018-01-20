import Vue from 'vue'

/* 1、提交表单 */
export function postForm (data) {
  return Vue.http({
    method: 'post',
    url: '/index.php/zt/zt_topic/add',
    data
  })
}

/* 2、获取栏目 */
export function getColumns () {
  return Vue.http({
    method: 'get',
    url: '/index.php/zt/zt_topic/list_label'
  })
}

/* 3、获取留言列表 */
export function getLists (id, page) {
  const temp = page || 1
  return Vue.http({
    method: 'get',
    url: `/index.php/zt/zt_topic/list_topic/${id}/${temp}/15`
  })
}

/* 4、获取留言详情 */
export function getDetail (id) {
  return Vue.http({
    method: 'get',
    url: `/index.php/zt/zt_topic/view/${id}`
  })
}
