<template>
  <button class="inline-flex items-center gap-1" @click="handleClick">
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

/**
 * @description: 点击按钮，触发安装提示
 */
const handleClick = () => {
  console.log('click event:', window.deferredPrompt)
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt()
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      window.deferredPrompt = null
    })
  }
}

window.addEventListener('beforeinstallprompt', (evt) => {
  console.log('🎯 beforeinstallprompt Event fired')
  // 阻止浏览器默认的安装行为触发 (目前仅限安卓 Chrome 有默认安装行为)
  evt.preventDefault()
  // 缓存 beforeinstallprompt 事件对象
  evtBeforeInstallPrompt = evt
  // 显示安装按钮
  updateShow(true)
  return false
})
</script>

<style lang="scss" scoped></style>
