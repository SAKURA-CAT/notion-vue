<template>
  <button class="inline-flex items-center gap-1" @click="click">
    <p class="hover:underline underline-offset-2">{{ text }}</p>
  </button>
</template>

<script setup>
/**
 * @description: pwa按钮，点击跳出安装提示
 * @file: PwaButton.vue
 * @since: 2024-05-12 18:09:51
 **/
defineProps({
  text: {
    type: String,
    required: true
  }
})

const click = (e) => {
  Notification.requestPermission().then(function (result) {
    if (result === 'granted') {
      console.log('用户同意了')
      // 生成推送订阅
      sendPushNotification()
    }
  })
}

// 发送推送消息
function sendPushNotification() {
  console.log('sendPushNotification')
  navigator.serviceWorker.ready.then(function (registration) {
    // console.log('registration', registration)
    console.log('registration.showNotification')
    registration.showNotification('Hello World!', {
      body: 'Here is a notification body!',
      icon: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: 'vibration-sample'
    })
  })
}
</script>

<style lang="scss" scoped></style>
