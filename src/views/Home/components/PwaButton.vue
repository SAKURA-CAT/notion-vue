<template>
  <button class="inline-flex items-center gap-1" @click="addToDesktop">
    <DownloadIcon class="w-4 h-4" />
    <p class="hover:underline underline-offset-2">{{ text }}</p>
  </button>
</template>

<script setup>
/**
 * @description: pwa按钮，点击跳出安装提示
 * @file: PwaButton.vue
 * @since: 2024-05-12 18:09:51
 **/
import DownloadIcon from '@/components/DownloadIcon.vue'
import { isIOS } from '@/utils/common'
defineProps({
  text: {
    type: String,
    required: true
  }
})
let deferredPrompt = null

window.addEventListener('beforeinstallprompt', function (e) {
  console.log('beforeinstallprompt Event fired:', e)
  deferredPrompt = e
  e.preventDefault() // Prevents prompt display
})

// 手动触发PWA安装
function addToDesktop() {
  if (!deferredPrompt) return isIOS() ? alert('Apple设备需要手动添加到桌面') : alert('你似乎已经安装了该应用')
  deferredPrompt.prompt()
}
</script>

<style lang="scss" scoped></style>
