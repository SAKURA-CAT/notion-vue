<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="isolation: isolate"
    viewBox="0 0 24 24"
    width="24pt"
    height="24pt"
    v-if="!isMobile"
  >
    <defs>
      <clipPath id="_clipPath_wJQBw8Gsx0PIEdmmZ7EAhrawCMbq7yC1"><rect width="24" height="24"></rect></clipPath>
    </defs>
    <g clip-path="url(#_clipPath_wJQBw8Gsx0PIEdmmZ7EAhrawCMbq7yC1)">
      <g>
        <path
          d=" M 5.861 19.331 L 5.57 21.189 L 5.13 21.875 C 4.852 22.173 4.919 22.29 5.317 22.213 L 19.008 22.175 C 19.27 22.165 19.245 21.97 19.074 21.819 L 18.748 21.331 L 18.568 19.368 L 5.861 19.331 Z  M 21.394 13.562 C 21.112 13.55 20.417 13.752 20.583 14.658 L 20.557 16.765 C 20.557 17.796 20.16 18.197 18.938 18.047 L 4.307 17.913 C 3.53 18.084 3.16 17.669 3.189 16.663 L 3.228 6.08 C 3.15 5.527 3.431 5.173 4.063 5.008 L 9.588 5.029 C 11.422 4.986 11.427 3.523 9.541 3.556 L 2.801 3.65 C 2.088 3.669 1.76 4.025 1.809 4.708 L 1.771 18.157 C 1.869 19.103 2.023 19.367 2.748 19.422 L 21.02 19.408 C 21.803 19.541 22.238 19.153 22.318 18.237 L 22.274 14.729 C 22.269 13.954 21.675 13.573 21.394 13.562 Z  M 14.923 2.775 C 14.492 3.292 15.267 10.72 14.708 10.438 C 14.404 10.284 13.814 9.759 12.936 8.862 C 12.412 8.147 12.336 8.147 11.723 8.683 L 11.05 9.276 C 10.367 9.685 10.621 9.887 11.075 10.19 L 15.01 14.449 C 15.791 15.131 15.822 15.456 16.509 14.386 L 20.883 10.242 C 21.275 9.948 21.319 9.637 21.01 9.304 L 19.98 8.319 C 19.707 8.004 19.461 8.016 19.234 8.346 L 17.891 9.969 L 17.401 10.585 L 17.398 2.782 Q 15.384 2.222 14.923 2.775 Z "
          fill-rule="evenodd"
          fill="currentColor"
        ></path>
      </g>
    </g>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="isolation: isolate"
    viewBox="0 0 24 24"
    width="24pt"
    height="24pt"
    v-else
  >
    <defs>
      <clipPath id="_clipPath_rnpDcv3XSHoXzye5ycAxBn1N5nbiy1UP"><rect width="24" height="24"></rect></clipPath>
    </defs>
    <g clip-path="url(#_clipPath_rnpDcv3XSHoXzye5ycAxBn1N5nbiy1UP)">
      <path
        d=" M 18.011 16.254 L 18.011 22.001 C 18.011 23.052 17.157 23.906 16.105 23.906 L 4.671 23.906 C 3.62 23.906 2.766 23.052 2.766 22.001 L 2.766 1.999 C 2.766 0.948 3.62 0.094 4.671 0.094 L 12.517 0.094 L 12.517 5.617 L 4.992 5.617 L 4.992 18.383 L 15.784 18.383 L 15.784 16.309 L 18.011 16.254 L 18.011 16.254 Z  M 11.426 8.938 L 17.081 14.444 L 22.798 8.756 L 20.908 7.112 L 18.166 10.043 L 18.011 2.11 L 15.784 2.11 L 15.87 9.937 L 13.047 7.112 L 11.426 8.938 Z "
        fill-rule="evenodd"
        fill="currentColor"
      ></path>
    </g>
  </svg>
</template>

<script setup>
/**
 * @description: 下载图标，手机和电脑端的下载图标不一样
 * @file: DownloadIcon.vue
 * @since: 2024-05-12 18:16:10
 **/

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
</script>

<style lang="scss" scoped></style>
