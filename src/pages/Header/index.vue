<template>
  <!--网站左侧-->
  <header class="flex flex-col relative py-3">
    <!--logo以及网站名-->
    <div class="flex justify-center">
      <router-link to="/" class="text-black">
        <n-space class="flex items-center ">
          <n-avatar :size="48" round src="http://124.220.47.26:7777/images/dog.jpg" />
          <span class="text-xl text-black subpixel-antialiased font-semibold cursor-pointer">HappyDog</span>
        </n-space>
      </router-link>
    </div>
    <ul class="space-y-2">
      <li>
        <router-link to="/sign-in">
          <div v-if="userStore.getToken === '' "
            class="rounded-lg text-center border border-purple-400 w-full px-4 py-2 mb-2 cursor-pointer text-purple-400 font-semibold hover:border-purple-500 hover:text-white hover:bg-purple-500 active:bg-purple-400 active:text-white active:border-opacity-0">
            登录
          </div>
        </router-link>
      </li>
      <li v-for="item in leftList" :key="item.title"
        :class="route.path === item.path ? 'rounded-lg text-purple-400' : null"
        class="relative flex items-center px-4 py-2 cursor-pointer text-black font-semibold hover:bg-gray-200 hover:rounded-lg group"
        @click="router.push({path:item.path}) ">
        <n-icon size="20" class="mr-4">
          <Home v-if="item.key === 1" />
          <Gamepad v-else-if="item.key === 2" />
          <FacebookMessenger v-else-if="item.key === 3" />
          <User v-else-if="item.key === 4" />
        </n-icon>
        {{ item.title }}
        <n-icon size="18" class="absolute right-2 invisible group-hover:visible">
          <ChevronRight />
        </n-icon>
      </li>
      <li v-if="route.path !== '/create'">
        <button
          class="w-full rounded-lg bg-purple-400 text-white border-none hover:bg-purple-500 active:bg-purple-400 focus:outline-none"
          @click="router.push('/create')">发帖子</button>
      </li>
    </ul>
    <div
      class="absolute inset-x-0 bottom-3 mx-auto px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-200 hover:rounded-lg">
      <div class="flex items-center">
        <n-avatar size="large" src="http://124.220.47.26:7777/images/dog.jpg" />
        <span class="ml-2">用户名</span>
      </div>
      <n-icon>
        <EllipsisH />
      </n-icon>
    </div>
  </header>

</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { useUserStore } from '@/store';
import { Github, Home, Gamepad, FacebookMessenger, User, ChevronRight, EllipsisH } from '@vicons/fa'
import { useRoute, useRouter } from 'vue-router';
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const leftList = [
  { key: 1, title: "主页", path: '/home' },
  { key: 2, title: "游戏库", path: '/games' },
  { key: 3, title: "讨论", path: '/forums' },
  { key: 4, title: "个人", path: '/profile' },
];
</script>

  
<style scoped>

</style>
  