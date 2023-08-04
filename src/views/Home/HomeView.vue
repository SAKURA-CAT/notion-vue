<script setup>
import userAvatar from '@/assets/img/user.png'
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <!-- 标题介绍部分，这部分不可编辑 -->
    <div class="max-w-full w-[900px] min-w-0 px-24 pt-32">
      <h1 class="text-[40px] leading-[1.2] font-bold">Notion-Vue</h1>
      <!-- 评论与介绍 -->
      <div class="mt-5 flex flex-col gap-2 text-sm">
        <!-- 一条评论 -->
        <div class="flex shrink-0 gap-3 w-full">
          <img :src="userAvatar" class="w-5 h-5 rounded-full border box-border" />
          <div class="overflow-hidden w-full">
            <p class="font-semibold">SAKURA-CAT</p>
            <p class="mt-0.5 text-gray-800 w-full cursor-text">
              项目链接：<a class="text-gray-500" href="https://github.com/SAKURA-CAT/notion-vue">
                <span class="border-b border-gray-300">https://github.com/SAKURA-CAT/notion-vue</span>
              </a>
            </p>
          </div>
        </div>
        <!-- 添加评论 -->
        <div class="flex shrink-0 gap-3 w-full items-center">
          <img :src="userAvatar" class="w-5 h-5 rounded-full border box-border" />
          <button class="overflow-hidden w-full h-8 hover:bg-gray-100 rounded text-left">
            <p class="text-gray-400 pl-1">Add a comment</p>
          </button>
        </div>
        <!-- 评论最下方的分割线 -->
        <div class="border-b border-gray-300 h-2"></div>
      </div>
    </div>
    <!-- 主要内容部分 -->
    <div class="max-w-full w-[900px] min-w-0 px-24"></div>
  </div>
</template>

<style lang="scss" scoped></style>
