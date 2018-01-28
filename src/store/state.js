// initial data
const state = {
  msg: '从即日起至2018年1月20日，集团诚邀各位员工参与 2018 年“我向杨董说句话”谏言征集活动。你可以通过这条网络通道，说说对公司经营发展的相关建议。',
  lastTime: Date.parse('2018-01-20 23:59:59'),
  checkerArr: [
    {value: '0', tips: '实名发布'},
    {value: '1', tips: '匿名发布'}
  ],
  columns: [],
  lists: [],
  total: 0,
  detail: {},
  isPost: false,
  resSubmit: {}
}

export default state
