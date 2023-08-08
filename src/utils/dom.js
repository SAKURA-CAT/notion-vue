// 基于原生js的相关操作，在这里我们不考虑dom没有被渲染出来的情况，请在使用时自行判断

/**
 * 1. focus一个dom元素，这个dom元素的contenteditable属性为true，可以选择光标的位置
 * @param { string } id dom节点的id
 * @param { Function } callback 回调函数传入一些光标信息，返回光标位置信息
 */
export const focusADom = (id, callback) => {
  const dom = document.getElementById(id)
  // 查看dom节点内部的innertext
  const text = dom.innerText
  // const lines = breakWords(
  //   text,
  //   Number(window.getComputedStyle(dom).width.split('px')[0]),
  //   window.getComputedStyle(dom).font
  // )
  // console.log(text, lines)

  // 获取 contenteditable 元素,例如通过ID获取

  // 指定要定位的字符的索引位置
  let charIndex = text.length
  if (callback) charIndex = callback(charIndex)
  // 创建一个range
  const range = document.createRange()

  // 设置range的起始位置到指定的节点和字符索引
  if (dom.firstChild) {
    range.setStart(dom.firstChild, charIndex)

    // 折叠range,只包含一个位置
    range.collapse(true)

    // 获取选择区对象
    const selection = window.getSelection()

    // 删除当前所有的选择区
    selection.removeAllRanges()

    // 添加我们新建的选择区
    selection.addRange(range)
  }
  // 让contenteditable元素获取焦点
  dom.focus()
}

/**
 * 获取光标位置，返回光标位置信息
 * @param { HTMLElement } dom dom节点，当dom为undefined时，会自动获取id为id的dom节点
 * @param { string } id dom节点的id，当dom为undefined时，会自动获取id为id的dom节点
 * @returns
 */
export function getCaretPosition(dom, id) {
  if (!dom) dom = document.getElementById(id)
  // 获取选区
  const selection = window.getSelection()
  // 获取锚点元素
  const anchorNode = selection.anchorNode
  // 获取锚点元素的文本内容
  const textContent = anchorNode.textContent
  // 拆分行数组
  const lines = breakWords(
    textContent,
    Number(window.getComputedStyle(dom).width.split('px')[0]),
    window.getComputedStyle(dom).font
  )
  // console.log('拆分后的行数组：', lines)
  // 将一维的偏移量转换为二维的偏移量
  const offset = selection.anchorOffset
  let row = 0
  let col = offset
  for (let i = 0; i < lines.length; i++) {
    if (col > lines[i].length) {
      col -= lines[i].length
      row++
    } else break
  }
  return {
    // 总行数
    row: lines.length,
    // 总列数
    col: lines[0]?.length || 0,
    // 当前函数
    nowRow: row,
    // 当前列数
    nowCol: col,
    // 一维偏移量
    offset,
    // 一维字符串总长度
    length: textContent.length,
    // 是否在第一行
    isFirstRow: row === 0,
    // 是否在最后一行
    isLastRow: row === lines.length - 1,
    // 是否在第一列
    isFirstCol: col === 0,
    // 光标是否在最后
    isLast: offset === textContent.length
  }
}
/**
 * 分析文本，将文本拆分为行数组
 * @param { string } text dom节点的文本内容
 * @param { number } maxWidth dom节点的宽度
 * @param { string } font dom节点的font属性
 * @returns
 */
export function breakWords(text, maxWidth, font) {
  // 生成文本测量对象
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = font
  const lines = []
  let currentLine = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (context.measureText(currentLine + char).width > maxWidth) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine += char
    }
  }
  lines.push(currentLine)
  return lines
}

/**
 * 判断当前是否存在选区
 */
export function hasSelection() {
  const selection = window.getSelection()
  return !!selection && !selection.isCollapsed
}
