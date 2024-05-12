<template>
  <div class="flex shrink-0 gap-3 w-full">
    <img :src="avatar" class="w-5 h-5 rounded-full border box-border" />
    <div class="overflow-hidden w-full">
      <p class="font-semibold">{{ username }}</p>
      <p class="mt-0.5 text-gray-800 w-full cursor-text flex items-center">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * @description: header的评论组件
 * @file: HeaderComment.vue
 * @since: 2024-05-12 17:58:07
 **/

defineProps({
  avatar: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
