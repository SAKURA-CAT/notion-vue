<script setup>
import { onMounted, ref } from 'vue'
import contenteditable from 'vue-contenteditable'
import { getCaretPosition, hasSelection } from '@/utils/dom'
import { debounce } from '@/utils/common'
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    default: 0
  },
  message: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['input', 'returned', 'deleted', 'moved'])
const c = ref(null)

const _message = ref(props.message)
const handleInput = (e) => {
  // 如果message为空或者只有换行符，那么清空dom元素和message
  if (!_message.value || _message.value === '\n') {
    // 由于是双向绑定，所以这里直接清空message即可
    _message.value = ''
  }
  if (e.isComposing) return
  // debouncedInput()
  emits('input', props.index, _message.value)
}

const debouncedInput = debounce(() => {
  emits('input', props.index, _message.value)
}, 500)

/********************************************
 * 事件监听
 *******************************************/
const focused = ref(false)
// focus时显示placeholder
const handleFocus = () => {
  focused.value = true
}
// blur时隐藏placeholder
const handleBlur = () => {
  focused.value = false
}

const placeholder = computed(() => {
  return focused.value ? 'Press "/" for commands...' : ''
})

// 回车事件监听
function handleEnter(msg) {
  // console.log('触发BlockLine的回车事件')
  // 获取当前光标位置
  const offset = getCaretPosition(undefined, props.id)
  // 截取
  const leftMsg = msg.slice(offset.offset)
  msg = msg.slice(0, offset.offset)
  // console.log('leftMsg', leftMsg)
  emits('returned', props.index, msg, leftMsg)
}
// 键盘事件监听
function handleKeydown(e) {
  // console.log(e.key)
  switch (e.key) {
    case 'Backspace':
      // console.log('触发BlockLine的删除事件')
      // 如果当前光标在第一行第一列，那么触发删除事件
      const offset = getCaretPosition(e.target)
      if (offset.isFirstRow && offset.isFirstCol && !hasSelection()) {
        e.preventDefault()
        emits('deleted', props.index, _message.value)
      }
      break
    default:
      handleMove(e)
  }
}
// 上下移动事件监听，回传当前光标位置与移动方向，光标位置为相对于当前行的位置
function handleMove(e) {
  let offset
  function emitMoveEvent() {
    // 获取移动方向
    const direction = e.key
    // 阻止默认事件
    e.preventDefault()
    // console.log('触发BlockLine的移动事件')
    emits('moved', props.index, { offset, direction })
  }
  // 允许接收的按键
  const allowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  if (allowKeys.includes(e.key)) {
    // console.log('触发BlockLine的移动事件')
    // 获取光标位置
    offset = getCaretPosition(e.target)
    // console.log('光标位置：', offset)
    // 有一些情况触发移动事件
    // 1. 光标在第一行，按上键
    if (offset.isFirstRow && e.key === 'ArrowUp') emitMoveEvent()
    // 2. 光标在最后一行，按下键
    if (offset.isLastRow && e.key === 'ArrowDown') emitMoveEvent()
    // 3. 光标在第一列，按左键
    if (offset.isFirstCol && e.key === 'ArrowLeft') emitMoveEvent()
    // 4. 光标在末尾，按右键
    if (offset.isLast && e.key === 'ArrowRight') emitMoveEvent()
  }
}
</script>

<template>
  <contenteditable
    :id="id"
    @input="handleInput"
    @returned="handleEnter"
    @keydown="handleKeydown"
    @focusin="handleFocus"
    @focusout="handleBlur"
    v-model="_message"
    tag="div"
    class="contenteditable"
    spellcheck="false"
    :placeholder="placeholder"
    contenteditable
    no-nl
    no-html
  />
</template>

<style lang="scss" scoped>
.contenteditable {
  @apply min-h-7.5 my-0.25 break-words outline-none caret-black cursor-text;
  caret-color: rgb(55, 53, 47);
}
// 为contenteditable添加placeholder
.contenteditable[contenteditable='true'] {
  &:empty::after {
    content: attr(placeholder);
    color: rgba(55, 53, 47, 0.5);
  }
}
</style>
