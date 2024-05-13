// 一些辅助函数

/**
 * 防抖函数
 * @param {*} fn, 要执行的函数
 * @param {*} delay, 延迟时间, 默认500ms
 * @returns
 */
export const debounce = (fn, delay = 500) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches
}

export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
