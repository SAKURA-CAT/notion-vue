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
  },
  contentStyle: {
    type: String,
    default: ''
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

// const debouncedInput = debounce(() => {
//   emits('input', props.index, _message.value)
// }, 500)

/********************************************
 * 事件监听
 *******************************************/
const focused = ref(false)
// focus时显示placeholder
const handleFocus = (e) => {
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

// 保存上一个keydown事件
let lastKeydownEvent = null
function handleKeydown(e) {
  // console.log(e.key)
  switch (e.key) {
    case 'Backspace':
      // console.log('触发BlockLine的删除事件')
      // 如果上一个keydown事件的isComposing为true，那么不触发删除事件
      if (lastKeydownEvent?.isComposing) break
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
  lastKeydownEvent = e
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
  <div class="relative my-0.25 content-block">
    <div class="buttons">
      <!-- 添加按钮 -->
      <div role="button" class="aspect-square plus">
        <svg role="graphics-symbol" viewBox="0 0 16 16" class="h-full w-3.5 block fill-current flex-shrink-0">
          <path
            d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"
          ></path>
        </svg>
      </div>
      <!-- 菜单按钮 -->
      <div role="button" class="menu px-0.5">
        <svg role="graphics-symbol" viewBox="0 0 10 10" class="my-1 h-3.5 w-3.5 block fill-current flex-shrink-0">
          <path
            d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"
          ></path>
        </svg>
      </div>
    </div>
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
      :class="contentStyle"
      spellcheck="false"
      :placeholder="placeholder"
      contenteditable
      no-nl
      no-html
    />
  </div>
</template>

<style lang="scss" scoped>
.content-block {
  .contenteditable {
    @apply min-h-7.5 py-[3px] px-0.5  break-words break-all outline-none caret-black cursor-text text-sm;
    caret-color: rgb(55, 53, 47);
  }
  .buttons {
    @apply absolute right-[100%] pr-1 h-full opacity-0 flex gap-1 my-0.25;
    div {
      @apply hover:bg-gray-100 py-0.5 text-gray-400 rounded h-6 flex justify-center items-center;
    }
  }

  &:hover {
    .buttons {
      @apply opacity-100;
    }
  }
}
// 为contenteditable添加placeholder
.contenteditable[contenteditable='true'] {
  &:empty::after {
    content: attr(placeholder);
    color: rgba(55, 53, 47, 0.5);
  }
}
</style>
