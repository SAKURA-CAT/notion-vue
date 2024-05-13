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
defineProps({
  text: {
    type: String,
    required: true
  }
})

var deferredPrompt = null

window.addEventListener('beforeinstallprompt', function (e) {
  console.log('beforeinstallprompt Event fired')
  e.preventDefault() // Prevents prompt display
})

// 手动触发PWA安装
function addToDesktop() {
  deferredPrompt.prompt()
}
</script>

<style lang="scss" scoped></style>
