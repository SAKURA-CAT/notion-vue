/**
 * Service Worker 只能控制其所在目录及其子目录下的文件
 * 所以，需要将 Service Worker 文件放在根目录下，或者放在 public 目录下
 */
const defaultCacheUrl = ['/']
const cacheName = 'my-cache'
const cacheWhitelist = [cacheName]

// 安装 Service Worker
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      // 添加你想要缓存的其他文件路径
      return cache.addAll(['/'])
    })
  )
})

// 激活 Service Worker
self.addEventListener('activate', function (event) {
  console.log('激活 Service Worker')
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // console.log('删除缓存:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// 直接从缓存中取，同时会发起网络请求 更新本地缓存，这意味着资源不会立即更新，而是会在发起第二次请求后才是最新的
self.addEventListener('fetch', function (event) {
  // console.log('fetch:', event.request.url)
  event.respondWith(
    caches.open(cacheName).then(async function (cache) {
      return cache.match(event.request).then(function (response) {
        const fetchPromise = fetch(event.request).then(function (networkResponse) {
          // 如果请求的scheme不是当前页面的scheme，直接返回
          if (!networkResponse || !networkResponse.url || networkResponse.url.startsWith('chrome-extension://')) {
            // console.log('请求的scheme不是当前页面的scheme:', event.request.url)
            return networkResponse
          }
          cache.put(event.request, networkResponse.clone())
          // console.log('更新缓存:', event.request.url)
          return networkResponse
        })

        return response || fetchPromise
      })
    })
  )
})

// 监听推送事件
self.addEventListener('push', function (event) {
  // 接收到推送事件
  const options = {
    body: 'This is a push notification!',
    icon: '/512x512.png'
    // badge: 'path/to/badge.png'
  }

  event.waitUntil(self.registration.showNotification('Push Notification', options))
})
