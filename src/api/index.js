const isTest = process.env.NODE_ENV === 'production' ? '' : '/test'
export default {
  /* 1、提交表单 */
  postForm: isTest + '/index.php/zt/zt_topic/add',
  /* 2、获取栏目 */
  getColumns: isTest + '/index.php/zt/zt_topic/list_label',
  /* 3、获取留言列表 */
  getLists (id, page) {
    page = page || 1
    return isTest + `/index.php/zt/zt_topic/list_topic/${id}/${page}/15`
  },
  /* 4、获取留言详情 */
  getDetail (id) {
    return isTest + `/index.php/zt/zt_topic/view/${id}`
  }
}
