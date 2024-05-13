<script setup>
// import BlockLine from '@/components/BlockLine.vue'
import { focusADom, getCaretPosition, getLines } from '@/utils/dom'
import { useEditStore } from '@/store'
import { nextTick, onMounted } from 'vue'
import cover from '@/assets/image/cover.jpeg'
import HeaderComment from './components/HeaderComment.vue'
import PwaButton from './components/PwaButton.vue'
import { isPWA } from '@/utils/common'
import MsgButton from './components/MsgButton.vue'
const editStore = useEditStore()
editStore.init()
const avatar = 'https://avatars.githubusercontent.com/u/79990647?v=4'
const messages = computed(() =>
  editStore.messages.map((message) => {
    return {
      ...message,
      id: message.id || uuidv4()
    }
  })
)
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

// focus a empty block
const focusEmptyBlock = (index = messages.value.length - 1) => {
  const block = document.getElementById(messages.value[index].id)
  if (!messages.value[index].content) {
    block.focus()
  } else {
    throw new Error('block is not empty')
  }
}
/********************************************
 * 相关逻辑函数
 *******************************************/
onMounted(() => {
  // 如果只有一个block，且block的content为空，那么focus到这个block
  if (messages.value.length === 1 && !messages.value[0].content) {
    focusEmptyBlock(0)
  }
})
// 添加一个block
const addBlockLine = (index = editStore.messages.length, content = '') => {
  focused.value = true
  editStore.addMessage({ type: 'text', content }, index)
}

// 点击最下方，添加一个block
const handleClick = () => {
  // 如果最后一个block不是空的，那么就添加一个新的block，如果是空的，就focus到最后一个block
  const lastMessage = messages.value[messages.value.length - 1]
  if (lastMessage.content) {
    addBlockLine()
  } else {
    focusADom(lastMessage.id)
  }
}

/********************************************
 * 通用事件捕获
 *******************************************/
// 这个属性用于控制这个模块在渲染以后是否focus，默认为false，当创建了新的block以后为true
const focused = ref(false)
// 回车事件捕获
const handleEnter = (index, msg, leftMsg) => {
  // TODO 保存数据
  // console.log(msg)
  editStore.updateMessage(index, {
    content: msg
  })
  // 添加新的block
  addBlockLine(index + 1, leftMsg)
  // focus到新的block
  nextTick(() => {
    focusADom(messages.value[index + 1].id, () => 0)
  })
}
// 上下移动事件捕获
const handleMove = (index, { offset, direction }) => {
  // 排除特殊情况
  if (index === 0 && (direction === 'ArrowUp' || direction === 'ArrowLeft')) return
  if (index === messages.value.length - 1 && (direction === 'ArrowDown' || direction === 'ArrowRight')) return
  // 修改当前光标位置
  switch (direction) {
    case 'ArrowLeft':
      // 光标移动到上一个block的末尾
      focusADom(messages.value[index - 1].id)
      break
    case 'ArrowRight':
      // 光标移动到下一个block的开头
      focusADom(messages.value[index + 1].id, () => 0)
      break
    case 'ArrowUp':
      // 光标移动到上一个block的当前偏移位置
      const { offset: upOffset } = offset
      // 获取上一个block的字符串信息
      const lines = getLines(messages.value[index - 1].id)
      // console.log(index - 1, lines)
      // 移动到最后一行的相应偏移的位置，如果偏移位置超过了最后一行的长度，那么就移动到最后一行的末尾
      const lastLine = lines.words[lines.words.length - 1]
      if (lastLine.length < upOffset) {
        focusADom(messages.value[index - 1].id)
      } else {
        // 移动到相应的位置
        const o = lines.maxCol * (lines.linesLength - 1) + upOffset
        focusADom(messages.value[index - 1].id, () => o)
      }
      break
    case 'ArrowDown':
      // 光标移动到下一个block的当前偏移位置
      const { offset: downOffset } = offset
      // 获取下一个block的字符串信息
      const downLines = getLines(messages.value[index + 1].id)
      // 移动到第一行的相应偏移的位置，如果偏移位置超过了第一行的长度，那么就移动到第一行的开头
      const firstLine = downLines.words[0]
      if (firstLine.length < downOffset) {
        focusADom(messages.value[index + 1].id)
      } else {
        // 移动到相应的位置
        focusADom(messages.value[index + 1].id, () => downOffset)
      }
      break
  }
}

// 输入事件捕获
const handleInput = (index, msg) => {
  // console.log(msg)
  // 保存当前的光标位置
  const offset = getCaretPosition(undefined, messages.value[index].id)
  editStore.updateMessage(index, {
    content: msg
  })
  nextTick(() => {
    focusADom(messages.value[index].id, () => offset.offset)
  })
}

// 删除事件捕获
const handleDelete = (index, msg) => {
  // console.log(msg)
  // 如果当前block是第一个block，那么不允许删除
  if (index === 0) {
    return
  }
  // 如果当前block不是第一个block，那么删除当前block，并且focus到上一个block
  editStore.deleteMessage(index)
  // 更新数据，将原本index上的数据接到index-1上
  const prevMsg = messages.value[index - 1].content
  editStore.updateMessage(index - 1, {
    content: prevMsg + msg
  })
  nextTick(() => {
    focusADom(messages.value[index - 1].id, () => prevMsg.length)
  })
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen relative">
    <img class="h-60 w-screen object-cover object-top" :src="cover" />

    <!-- 标题介绍部分，这部分不可编辑 -->
    <div class="max-w-full w-[900px] min-w-0 px-20 pt-20" ref="title">
      <span class="text-7xl absolute top-60 -translate-y-[50%] ml-3">🥳</span>
      <h1 class="text-[40px] leading-[1.2] font-bold">Notion-Vue</h1>
      <!-- 评论与介绍 -->
      <div class="mt-5 flex flex-col gap-2 text-sm">
        <!-- 一条评论 -->
        <HeaderComment :avatar="avatar" username="SAKURA-CAT">
          项目链接：<a class="text-gray-500" href="https://github.com/SAKURA-CAT/notion-vue" target="_blank">
            <span class="border-b border-gray-300 sm:w-auto w-36 truncate block">
              https://github.com/SAKURA-CAT/notion-vue
            </span>
          </a>
        </HeaderComment>
        <HeaderComment :avatar="avatar" username="SAKURA-CAT" v-if="!isPWA()">
          <PwaButton class="text-gray-500 mr-1" text="点击此处" />
          安装PWA应用~
        </HeaderComment>
        <HeaderComment :avatar="avatar" username="SAKURA-CAT" v-else>
          <MsgButton class="text-gray-500 mr-1" text="点击此处" />
          测试PWA内消息推送~
        </HeaderComment>
        <!-- 添加评论 -->
        <div class="flex shrink-0 gap-3 w-full items-center">
          <img :src="avatar" class="w-5 h-5 rounded-full border box-border" />
          <div class="overflow-hidden w-full h-8 hover:bg-gray-100 rounded flex items-center cursor-pointer">
            <p class="text-gray-400 pl-1">Add a comment</p>
          </div>
        </div>
        <!-- 评论最下方的分割线 -->
        <div class="border-b border-gray-300 h-2"></div>
      </div>
    </div>
    <!-- 主要内容部分 -->
    <div class="content">
      <Component
        v-for="(message, index) in messages"
        :key="message.id"
        :is="editStore.type2Component[message.type]"
        :message="message.content"
        :index="index"
        :id="message.id"
        :focused="focused"
        @returned="handleEnter"
        @moved="handleMove"
        @input="handleInput"
        @deleted="handleDelete"
      />
      <!-- 设置监听，如果最后一个block不是空的，那么就添加一个新的block，如果是空的，就focus到最后一个block -->
      <div class="add-block" @click="handleClick"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  @apply max-w-full w-[900px] min-w-0 px-20 pt-4 grow flex flex-col;
  $last-child-height: 100px;
  .add-block {
    &:last-child {
      flex-grow: 1;
      min-height: $last-child-height;
    }
  }
}
</style>
