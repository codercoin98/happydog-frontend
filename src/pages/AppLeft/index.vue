<template>
  <!--网站左侧-->
  <div class="flex flex-col relative">
    <!--logo以及网站名-->
    <div class="flex justify-center h-20 py-3">
      <router-link to="/" class="text-black">
        <n-space class="flex items-center ">
          <n-avatar :size="48" round src="http://124.220.47.26:7777/images/dog.jpg" />
          <span class="text-xl text-black subpixel-antialiased font-semibold cursor-pointer">HappyDog</span>
        </n-space>
      </router-link>
    </div>
    <ul class="space-y-2 pb-4 border-bottom border-b-2">
      <li class="w-52">
        <router-link to="/sign-in">
          <div
            class="rounded-full text-center border border-purple-400 w-full px-4 py-2 mb-2 cursor-pointer text-purple-400 font-semibold hover:border-purple-500 hover:text-white hover:bg-purple-500 active:bg-purple-400 active:text-white active:border-opacity-0">
            登录
          </div>
        </router-link>
      </li>
      <li v-for="item in leftList" :key="item.title"
        :class="route.path === item.path ? 'bg-purple-500 rounded-full text-white' : null"
        class="flex justify-between w-52 items-center px-4 py-2 cursor-pointer text-black font-semibold hover:bg-purple-500 hover:rounded-full hover:text-white"
        @click="router.push({path:item.path}) ">
        <n-icon size="20" class="mr-4">
          <Home v-if="item.key === 1" />
          <PaperPlane v-else-if="item.key === 2" />
          <Users v-else-if="item.key === 3" />
          <Tools v-else-if="item.key === 4" />
        </n-icon>
        {{ item.title }}
        <n-icon size="18">
          <ChevronRight />
        </n-icon>
      </li>
    </ul>
    <div class="absolute inset-x-0 bottom-0 mx-auto h-20 w-40 flex flex-col justify-center items-center cursor-pointer">
      <a href="https://github.com/coderlcb" class="no-underline text-black">
        <n-space class="flex items-center">
          <n-icon size="20">
            <Github />
          </n-icon>
          Codercoin
        </n-space>
      </a>
      <div class="mt-2">{{ moment().format('dddd') }}</div>
    </div>
  </div>

</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { Github, Home, PaperPlane, Tools, Users, ChevronRight } from '@vicons/fa'
import moment from "moment";
import { useRoute, useRouter } from 'vue-router';
moment.locale('zh-cn', {
  weekdays: '星期天_星期一_星期二_星期三_星期四_星期五_星期六'.split('_')
})
const router = useRouter()
const route = useRoute()
const leftList = [
  { key: 1, title: "主页", path: '/' },
  { key: 2, title: "纸飞机", path: '/paper-plane' },
  { key: 3, title: "圈子", path: '/friends' },
  { key: 4, title: "工具", path: '/funny-tools' },
];
</script>

  
<style scoped>

</style>
  