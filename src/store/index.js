/**
 * 对于每个页面而言，内部所有模块共享此状态，用于存放编辑内容
 * 按道理来讲应该新建一个模块文件，但是这个项目比较小，所以就直接放在这里了
 */
import BlockLine from '@/components/BlockLine.vue'
import { defineStore } from 'pinia'
import { computed, ref, markRaw } from 'vue'

export const useEditStore = defineStore('edit', () => {
  // 消息列表，需要注意的是在设计上消息列表不为空，因为至少有一个消息，即空白添加消息
  // 但是本项目不会对此进行检查，所以需要在添加消息时进行检查
  const messages = ref([])
  // 由消息类型得到对应的组件
  const type2Component = markRaw({
    text: BlockLine
  })

  /**
   * actions
   */
  // 消息初始化，立即执行

  const init = () => {
    messages.value.push({
      type: 'text', // text对应BlockLine组件
      content: ''
    })
  }

  // 添加一条消息，可以选择添加的位置，默认添加到最后
  const addMessage = (msg = {}, index = -1) => {
    // 检查消息类型是否存在
    if (!type2Component[msg.type]) {
      throw new Error(`消息类型${type}不存在`)
    }
    if (index < 0) {
      messages.value.push({
        type: msg.type,
        content: msg.content || ''
      })
    } else {
      messages.value.splice(index, 0, {
        type: msg.type,
        content: msg.content || ''
      })
    }
  }

  // 更新一条消息，必须选择更新的位置，可更改消息类型和其他的内容
  const updateMessage = (index = -1, msg = {}) => {
    // 检查消息类型是否存在
    if (msg.type && !type2Component[msg.type]) {
      throw new Error(`消息类型${type}不存在`)
    }
    if (index < 0) {
      throw new Error('更新消息必须指定更新的位置')
    }
    // console.log(msg, index, messages.value)
    messages.value[index] = {
      type: msg.type || messages.value[index].type,
      content: msg.content || ''
    }
  }

  // 删除一条消息，必须选择删除的位置
  const deleteMessage = (index = -1) => {
    if (index < 0) {
      throw new Error('删除消息必须指定删除的位置')
    }
    messages.value.splice(index, 1)
  }

  return {
    messages,
    type2Component,
    init,
    addMessage,
    updateMessage,
    deleteMessage
  }
})
