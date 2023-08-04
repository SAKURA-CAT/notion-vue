/**
 * 对于每个页面而言，内部所有模块共享此状态，用于存放编辑内容
 * 按道理来讲应该新建一个模块文件，但是这个项目比较小，所以就直接放在这里了
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEditStore = defineStore('edit', () => {})
