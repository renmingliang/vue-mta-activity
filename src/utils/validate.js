import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

/**
 * html2Text
 * @param {Sting} val html
 * @return {String} text
 */
export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * formateDate
 * @param {String} val time
 * @return {String} remove second
 * example: 2018-01-01 10:20:21 => 2018-01-01 10:20
 */
export function formateDate (val) {
  if (!val) return ''
  return val.substr(0, val.length - 3)
}

/**
 * isSpace
 * 验证输入是否为空
 * @param {String} str
 * @return {Boolean}
 */
export function isSpace (str) {
  const res = str.replace(/^\s+|\s+$/g, '')
  if (!res) {
    Vue.$vux.toast.show({
      width: '8em',
      text: '输入不能为空',
      type: 'cancel'
    })
  }
  return !res
}

/**
 * isMobile
 * 验证输入是否为手机号
 * @param {String} str
 * @return {Boolean}
 */
export function isMobile (str) {
  const res = /^1\d{10}$/
  if (!res.test(str)) {
    Vue.$vux.toast.show({
      width: '8em',
      text: '手机号码不正确',
      type: 'cancel'
    })
  }
  return !res.test(str)
}

/**
 * getRect
 * @param {String} el
 * @return {Object}
 * 返回元素 { top, left, width, height}
 */
export function getRect (el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
